import axios from 'axios';

const API_URL = 'https://api.github.com';

// 定义接口类型
export interface Issue {
  id: number;
  number: number;
  title: string;
  state: string;
  created_at: string;
  updated_at: string;
  body: string;
  user: {
    login: string;
    avatar_url: string;
  };
  comments: number;
  labels: Array<{
    id: number;
    name: string;
    color: string;
  }>;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}

// 获取仓库信息
export const getRepository = async (owner: string, repo: string): Promise<Repository> => {
  const response = await axios.get(`${API_URL}/repos/${owner}/${repo}`);
  return response.data;
};

// 获取仓库的 issues 列表
export const getIssues = async (
  owner: string,
  repo: string,
  page: number = 1,
  perPage: number = 30,
  state: string = 'all'
): Promise<Issue[]> => {
  const response = await axios.get(`${API_URL}/repos/${owner}/${repo}/issues`, {
    params: {
      page,
      per_page: perPage,
      state,
      sort: 'created',
      direction: 'desc',
    },
  });
  return response.data;
};

// 获取单个 issue 详情
export const getIssue = async (
  owner: string,
  repo: string,
  issueNumber: number
): Promise<Issue> => {
  const response = await axios.get(`${API_URL}/repos/${owner}/${repo}/issues/${issueNumber}`);
  return response.data;
};

// 搜索仓库
export const searchRepositories = async (query: string, page: number = 1, perPage: number = 30): Promise<{
  items: Repository[];
  total_count: number;
}> => {
  const response = await axios.get(`${API_URL}/search/repositories`, {
    params: {
      q: query,
      page,
      per_page: perPage,
    },
  });
  return response.data;
}; 