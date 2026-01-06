const dotenv = require("dotenv");

dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const USERNAME = process.env.GITHUB_USERNAME;
const ORGNAME = process.env.GITHUB_ORGANIZATION;
const REPO_COUNT = 6;
const STORT_TYPE = "updated"; // Can be 'stars', 'forks', 'updated', etc.


module.exports = async function () {
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'User-Agent': '11ty-data-fetcher',
  };

  const url = `https://api.github.com/search/repositories?q=user:${USERNAME}&q=org:${ORGNAME}&sort=${STORT_TYPE}&order=desc&per_page=${REPO_COUNT}`;

  const response = await fetch(url, { headers });

  if (!response.ok) {
    console.error(`GitHub API error: ${response.statusText}`);
    return [];
  }

  const data = await response.json();
  return data.items.map(repo => ({
    name: repo.name,
    full_name: repo.full_name,
    html_url: repo.html_url,
    description: repo.description,
    stars: repo.stargazers_count,
    language: repo.language,
    updated_at: repo.updated_at,
  }));
}
