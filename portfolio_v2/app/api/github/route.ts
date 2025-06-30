/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/github/route.ts (GraphQL version - more reliable)
import { NextRequest, NextResponse } from 'next/server';

interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  languages: { name: string; percentage: number; color: string }[];
  recentActivity: { type: string; repo: string; date: string }[];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { error: 'Username parameter is required' },
      { status: 400 }
    );
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  
  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: 'GitHub token is required for accurate commit counts' },
      { status: 500 }
    );
  }

  const headers = {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
  };

  try {
    // GraphQL query to get comprehensive GitHub stats
    const graphqlQuery = `
      query($username: String!) {
        user(login: $username) {
          repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: UPDATED_AT, direction: DESC}) {
            totalCount
            nodes {
              name
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
              pushedAt
              defaultBranchRef {
                target {
                  ... on Commit {
                    history(author: {id: $username}) {
                      totalCount
                    }
                  }
                }
              }
            }
          }
          contributionsCollection {
            totalCommitContributions
            restrictedContributionsCount
          }
        }
      }
    `;

    // First, get user ID for commit history
    const userIdQuery = `
      query($username: String!) {
        user(login: $username) {
          id
        }
      }
    `;

    const userIdResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: userIdQuery,
        variables: { username }
      }),
    });

    if (!userIdResponse.ok) {
      throw new Error(`GitHub GraphQL API error: ${userIdResponse.status}`);
    }

    const userIdData = await userIdResponse.json();
    const userId = userIdData.data?.user?.id;

    // Now get the main stats with the user ID
    const mainQuery = `
      query($username: String!, $userId: ID!) {
        user(login: $username) {
          repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: UPDATED_AT, direction: DESC}) {
            totalCount
            nodes {
              name
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
              pushedAt
              defaultBranchRef {
                target {
                  ... on Commit {
                    history(author: {id: $userId}) {
                      totalCount
                    }
                  }
                }
              }
            }
          }
          contributionsCollection {
            totalCommitContributions
            restrictedContributionsCount
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mainQuery,
        variables: { username, userId }
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub GraphQL API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      throw new Error('GraphQL query failed');
    }

    const user = data.data?.user;
    if (!user) {
      throw new Error('User not found');
    }

    const repositories = user.repositories.nodes;

    // Calculate stats
    const totalRepos = user.repositories.totalCount;
    const totalStars = repositories.reduce((sum: number, repo: any) => sum + repo.stargazerCount, 0);
    const totalForks = repositories.reduce((sum: number, repo: any) => sum + repo.forkCount, 0);
    
    // Get commit count from contributions collection (more reliable)
    let totalCommits = user.contributionsCollection.totalCommitContributions + 
                      user.contributionsCollection.restrictedContributionsCount;

    // If the contributions collection doesn't have enough data, sum from repositories
    if (totalCommits < 10) {
      totalCommits = repositories.reduce((sum: number, repo: any) => {
        const commitCount = repo.defaultBranchRef?.target?.history?.totalCount || 0;
        return sum + commitCount;
      }, 0);
    }

    // Calculate language statistics
    const languageStats: { [key: string]: number } = {};
    repositories.forEach((repo: any) => {
      if (repo.primaryLanguage?.name) {
        const langName = repo.primaryLanguage.name;
        languageStats[langName] = (languageStats[langName] || 0) + 1;
      }
    });

    // Convert to percentage with colors
    const totalReposWithLanguage = Object.values(languageStats).reduce((sum: number, count: number) => sum + count, 0);
    
    const languageColors: { [key: string]: string } = {
      JavaScript: '#f7df1e',
      TypeScript: '#3178c6',
      Python: '#3776ab',
      Java: '#ed8b00',
      'C++': '#00599c',
      C: '#a8b9cc',
      'C#': '#239120',
      PHP: '#777bb4',
      Ruby: '#cc342d',
      Go: '#00add8',
      Rust: '#dea584',
      Swift: '#fa7343',
      Kotlin: '#7f52ff',
      HTML: '#e34c26',
      CSS: '#1572b6',
      Shell: '#89e051',
      Dockerfile: '#384d54',
      Vue: '#4fc08d',
      React: '#61dafb',
      Svelte: '#ff3e00',
    };

    const languages = Object.entries(languageStats)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / totalReposWithLanguage) * 100),
        color: languageColors[name] || repositories.find((repo: any) => 
          repo.primaryLanguage?.name === name
        )?.primaryLanguage?.color || '#8b5cf6',
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);

    // Get recent activity
    const recentActivity = repositories
      .filter((repo: any) => repo.pushedAt)
      .slice(0, 4)
      .map((repo: any) => ({
        type: 'push',
        repo: repo.name,
        date: getRelativeTime(repo.pushedAt),
      }));

    const stats: GitHubStats = {
      totalRepos,
      totalStars,
      totalForks,
      totalCommits,
      languages,
      recentActivity,
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    
    // Fallback to REST API if GraphQL fails
    try {
      return await fetchWithRestAPI(username);
    } catch (restError) {
      console.error('REST API fallback also failed:', restError);
      return NextResponse.json(
        { error: 'Failed to fetch GitHub data' },
        { status: 500 }
      );
    }
  }
}

// Fallback REST API function 
async function fetchWithRestAPI(username: string) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'GitHub-Stats-App',
  };

  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  // Get user data
  const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
  const userData = await userResponse.json();

  // Get repositories
  const reposResponse = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    { headers }
  );
  const reposData = await reposResponse.json();

  // Calculate basic stats
  const totalStars = reposData.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
  const totalForks = reposData.reduce((sum: number, repo: any) => sum + repo.forks_count, 0);

  // Use search API for commits (more reliable than stats endpoint)
  let totalCommits = 0;
  try {
    const searchResponse = await fetch(
      `https://api.github.com/search/commits?q=author:${username}&per_page=1`,
      { 
        headers: {
          ...headers,
          'Accept': 'application/vnd.github.cloak-preview'
        }
      }
    );
    
    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      totalCommits = searchData.total_count || 0;
    }
  } catch (error) {
    // Estimate if search fails
    totalCommits = reposData.length * 8;
  }

  // Basic language stats
  const languageStats: { [key: string]: number } = {};
  reposData.forEach((repo: any) => {
    if (repo.language) {
      languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
    }
  });

  const totalReposWithLanguage = Object.values(languageStats).reduce((sum: number, count: number) => sum + count, 0);
  const languages = Object.entries(languageStats)
    .map(([name, count]) => ({
      name,
      percentage: Math.round((count / totalReposWithLanguage) * 100),
      color: '#8b5cf6',
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);

  const recentActivity = reposData
    .sort((a: any, b: any) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
    .slice(0, 4)
    .map((repo: any) => ({
      type: 'push',
      repo: repo.name,
      date: getRelativeTime(repo.pushed_at),
    }));

  return NextResponse.json({
    totalRepos: userData.public_repos,
    totalStars,
    totalForks,
    totalCommits,
    languages,
    recentActivity,
  });
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else {
    return `${diffInDays} days ago`;
  }
}