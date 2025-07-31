import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  getRepository, 
  getIssues, 
  getIssue, 
  searchRepositories,
  Repository,
  Issue,
} from '../services/githubService';

interface GitHubContextType {
  repository: Repository | null;
  issues: Issue[];
  currentIssue: Issue | null;
  loading: boolean;
  error: string | null;
  searchResults: Repository[];
  totalResults: number;
  fetchRepository: (owner: string, repo: string) => Promise<void>;
  fetchIssues: (owner: string, repo: string, page?: number, perPage?: number, state?: string) => Promise<void>;
  fetchIssue: (owner: string, repo: string, issueNumber: number) => Promise<void>;
  searchRepos: (query: string, page?: number, perPage?: number) => Promise<void>;
}

const GitHubContext = createContext<GitHubContextType | undefined>(undefined);

export const useGitHub = () => {
  const context = useContext(GitHubContext);
  if (context === undefined) {
    throw new Error('useGitHub must be used within a GitHubProvider');
  }
  return context;
};

interface GitHubProviderProps {
  children: ReactNode;
}

export const GitHubProvider: React.FC<GitHubProviderProps> = ({ children }) => {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [currentIssue, setCurrentIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Repository[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);

  const fetchRepository = async (owner: string, repo: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRepository(owner, repo);
      setRepository(data);
    } catch (err) {
      setError('获取仓库信息失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchIssues = async (
    owner: string, 
    repo: string, 
    page: number = 1, 
    perPage: number = 30,
    state: string = 'all'
  ) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getIssues(owner, repo, page, perPage, state);
      setIssues(data);
    } catch (err) {
      setError('获取 issues 列表失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchIssue = async (owner: string, repo: string, issueNumber: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getIssue(owner, repo, issueNumber);
      setCurrentIssue(data);
    } catch (err) {
      setError('获取 issue 详情失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchRepos = async (query: string, page: number = 1, perPage: number = 30) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchRepositories(query, page, perPage);
      setSearchResults(data.items);
      setTotalResults(data.total_count);
    } catch (err) {
      setError('搜索仓库失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    repository,
    issues,
    currentIssue,
    loading,
    error,
    searchResults,
    totalResults,
    fetchRepository,
    fetchIssues,
    fetchIssue,
    searchRepos,
  };

  return <GitHubContext.Provider value={value}>{children}</GitHubContext.Provider>;
}; 