import React, { useState, useEffect } from 'react';
import { useGitHub } from '../contexts/GitHubContext';
import IssueItem from './IssueItem';
import { Issue } from '../services/githubService';

interface IssueListProps {
  owner: string;
  repo: string;
}

const IssueList: React.FC<IssueListProps> = ({ owner, repo }) => {
  const { issues, loading, error, fetchIssues } = useGitHub();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [issuesPerPage] = useState<number>(10);
  const [filter, setFilter] = useState<string>('all'); // 'all', 'open', 'closed'

  useEffect(() => {
    fetchIssues(owner, repo, currentPage, issuesPerPage, filter);
  }, [owner, repo, currentPage, issuesPerPage, filter, fetchIssues]);

  // 执行查询操作
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  //处理分页变化
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // 加载中
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // 加载错误信息
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Loading Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  // 返回Issue列表
  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handleFilterChange('all')}
          >
            全部
          </button>
          <button
            className={`px-4 py-2 rounded-md ${filter === 'open' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handleFilterChange('open')}
          >
            开启
          </button>
          <button
            className={`px-4 py-2 rounded-md ${filter === 'closed' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handleFilterChange('closed')}
          >
            关闭
          </button>
        </div>
      </div>

      {issues.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">没有找到符合条件的 issues</p>
        </div>
      ) : (
        <div>
          {issues.map((issue: Issue) => (
            <IssueItem 
              key={issue.id} 
              issue={issue} 
              repoOwner={owner} 
              repoName={repo} 
            />
          ))}
          
          <div className="flex justify-center mt-6">
            <nav className="flex items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-l-md border ${
                  currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}
              >
                上一页
              </button>
              
              <span className="px-4 py-1 border-t border-b bg-white">
                第 {currentPage} 页
              </span>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1 rounded-r-md border bg-white text-blue-600 hover:bg-blue-50"
              >
                下一页
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueList;