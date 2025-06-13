// /admin/ads/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Plus,
  Search,
  Grid,
  List,
  Download,
  Loader2
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// API 서비스
import { searchAds } from '@/services/adService';

// 분리된 컴포넌트 가져오기
import { AdCard, AdTable } from '@/components/admin/ads';

export default function AdsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  // 상태 관리
  const [viewMode, setViewMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('DESC');

  // 검색 쿼리 구성하기
  const searchParams = {
    page: currentPage,
    limit: itemsPerPage,
    title: searchQuery || undefined,
    status: statusFilter !== 'all' ? statusFilter : undefined,
    type: typeFilter !== 'all' ? typeFilter : undefined, // 'all'인 경우 type 매개변수를 전송하지 않음
    sortBy: sortBy,
    sortOrder: sortOrder
  };

  // API에서 데이터 가져오기
  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['ads', searchParams],
    queryFn: () => searchAds(searchParams),
    keepPreviousData: true
  });

  // 검색어 변경 시 디바운스 처리
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // 기존 타이머 제거
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    
    // 새 타이머 설정 (300ms 지연)
    const timer = setTimeout(() => {
      setCurrentPage(1); // 검색어 변경 시 첫 페이지로 이동
    }, 300);
    
    setDebounceTimer(timer);
  };

  // 상태 필터 변경 핸들러
  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  // 타입 필터 변경 핸들러
  const handleTypeChange = (value) => {
    setTypeFilter(value);
    setCurrentPage(1);
  };

  // 정렬 변경 핸들러
  const handleSortChange = (value) => {
    const sortOptions = {
      'newest': { sortBy: 'createdAt', sortOrder: 'DESC' },
      'oldest': { sortBy: 'createdAt', sortOrder: 'ASC' },
      'title': { sortBy: 'title', sortOrder: 'ASC' },
      'budget-high': { sortBy: 'budget', sortOrder: 'DESC' },
      'budget-low': { sortBy: 'budget', sortOrder: 'ASC' }
    };
    
    const option = sortOptions[value] || sortOptions.newest;
    setSortBy(option.sortBy);
    setSortOrder(option.sortOrder);
    setCurrentPage(1);
  };

  // 광고 상세 보기 핸들러
  const handleViewAd = (ad) => {
    router.push(`/admin/ads/${ad.id}`);
  };

  // 광고 내보내기 핸들러
  const handleExportAds = () => {
    toast.info('광고 데이터 내보내기 기능은 준비 중입니다.');
  };

  // 데이터 추출
  const ads = data?.ads || [];
  const pagination = data?.pagination || { totalItems: 0, totalPages: 1 };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">광고 관리</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1" onClick={handleExportAds}>
            <Download className="h-4 w-4" />
            <span>내보내기</span>
          </Button>
          <Button onClick={() => router.push('/admin/ads/add')} className="h-9 gap-1">
            <Plus className="mr-2 h-4 w-4" />
            광고 추가
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={statusFilter} onValueChange={handleStatusChange} className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <TabsList>
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="active">진행중</TabsTrigger>
            <TabsTrigger value="pending">대기중</TabsTrigger>
            <TabsTrigger value="paused">일시중지</TabsTrigger>
            <TabsTrigger value="inactive">종료됨</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="광고 검색..."
                className="pl-8 w-full sm:w-[250px]"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            <Select value={typeFilter} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="광고 유형" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 유형</SelectItem>
                <SelectItem value="sponsor">기업 광고</SelectItem>
                <SelectItem value="salon">미용실 광고</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="newest" onValueChange={handleSortChange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="정렬" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">최신순</SelectItem>
                <SelectItem value="oldest">오래된순</SelectItem>
                <SelectItem value="title">제목순</SelectItem>
                <SelectItem value="budget-high">예산 높은순</SelectItem>
                <SelectItem value="budget-low">예산 낮은순</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                className="h-9 w-9 rounded-none rounded-l-md"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" />
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                className="h-9 w-9 rounded-none rounded-r-md"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* 로딩 상태 */}
        {isLoading ? (
          <Card>
            <CardContent className="p-6 flex items-center justify-center min-h-[200px]">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">광고 목록을 불러오는 중...</p>
              </div>
            </CardContent>
          </Card>
        ) : isError ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-destructive">{error?.message || '데이터를 불러오는 중 오류가 발생했습니다.'}</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => refetch()}
              >
                다시 시도
              </Button>
            </CardContent>
          </Card>
        ) : (
          <TabsContent value={statusFilter} className="space-y-4">
            {ads.length > 0 ? (
              viewMode === 'list' ? (
                <AdTable ads={ads} onView={handleViewAd}/>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ads.map((ad) => (
                    <AdCard key={ad.id} ad={ad} onView={handleViewAd} />
                  ))}
                </div>
              )
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? '검색 결과가 없습니다.' 
                      : statusFilter === 'all' 
                        ? '등록된 광고가 없습니다.' 
                        : `${statusFilter === 'active' 
                          ? '진행중인' 
                          : statusFilter === 'pending' 
                            ? '대기중인' 
                            : statusFilter === 'paused' 
                              ? '일시중지된' 
                              : '종료된'} 광고가 없습니다.`}
                  </p>
                </CardContent>
              </Card>
            )}
            
            {/* 페이지네이션 */}
            {ads.length > 0 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  총 {pagination.totalItems}개의 광고 중 {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, pagination.totalItems)}개 표시
                </p>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1 || isLoading}
                  >
                    이전
                  </Button>
                  <span className="text-sm">
                    {currentPage} / {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                    disabled={currentPage >= pagination.totalPages || isLoading}
                  >
                    다음
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}