'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast } from "sonner";
import { Building, LayoutGrid, List, Plus } from "lucide-react";

import { SalonPageHeader } from "@/components/admin/salons/SalonPageHeader";
import { SalonTable } from "@/components/admin/salons/SalonTable";
import { SalonGrid } from "@/components/admin/salons/SalonGrid";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Loader2 } from "lucide-react";
import { ErrorDisplay } from "@/components/ui/error-display";
import { GridSkeleton } from "@/components/admin/salons/SkeletonLoaders";
import { TableSkeleton } from "@/components/admin/members/TableSkeleton";
import { Card } from "@/components/ui/card";
import { useAuthCheck } from "@/hooks/useAuthCheck";

const MySalonsList = () => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [viewMode, setViewMode] = useState('grid');
  const { isAuthenticated, isLoading } = useAuthCheck();
  
  // 페이지네이션 관련 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1
  });

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        setLoading(true);
        // NextJS API 라우트를 사용합니다
        const response = await api.get('/api/salons', {
          params: {
            page: currentPage,
            limit: itemsPerPage
          }
        });
        setSalons(response.data.salons);
        
        // 페이지네이션 정보 설정
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        } else {
          // API가 페이지네이션 정보를 제공하지 않는 경우
          setPagination({
            totalItems: response.data.salons.length,
            totalPages: 1
          });
        }
      } catch (error) {
        setError(error.message || '미용실 목록을 불러오는데 실패했습니다.');
        console.error('Error fetching salons', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, [currentPage, itemsPerPage]);

  const handleAddSalon = () => {
    router.push('/salons/add');
  };

  const handleViewSalon = (salon) => {
    router.push(`/salons/${salon.id}`);
  };

  const handleEditSalon = (salon) => {
    router.push(`/salons/${salon.id}/edit`);
  };

  const handleDeleteSalon = async (salon) => {
    if (window.confirm(`정말로 "${salon.name}" 미용실을 삭제하시겠습니까?`)) {
      try {
        setLoading(true);
        await api.delete(`/api/salons/${salon.id}`);
        
        // 삭제 후 목록 다시 불러오기
        const response = await api.get('/api/salons', {
          params: {
            page: currentPage,
            limit: itemsPerPage
          }
        });
        setSalons(response.data.salons);
        
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
        
        toast.success('미용실이 삭제되었습니다.');
      } catch (error) {
        toast.error('미용실 삭제 중 오류가 발생했습니다.');
        console.error('미용실 삭제 실패:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (error) {
    return (
      <ErrorDisplay
        message={error || '데이터를 불러오는 중 오류가 발생했습니다.'}
        retryFn={() => window.location.reload()}
        backPath="/dashboard"
        backLabel="대시보드로 이동"
      />
    );
  }

  return (
    <div className="container mx-auto p-4">
    <div className="space-y-6 mt-4">
      <SalonPageHeader onAddSalon={handleAddSalon}/>
      
      {/* 뷰 모드 전환 버튼 추가 */}
      <div className="flex justify-end mb-4">
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value)}>
          <ToggleGroupItem value="grid" aria-label="그리드 보기">
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="table" aria-label="테이블 보기">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

    {loading ? (
        viewMode === 'grid' ? <GridSkeleton /> : <TableSkeleton />
      ) : (
        <>
          {salons.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="rounded-full bg-gray-100 p-6">
                  <Building className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold">등록된 미용실이 없습니다</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  미용실 추가 버튼을 클릭하여 첫 미용실을 등록해보세요.
                </p>
                <Button onClick={handleAddSalon} className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  미용실 추가하기
                </Button>
              </div>
            </Card>
          ) : viewMode === 'grid' ? (
            <SalonGrid 
              salons={salons}
              onView={handleViewSalon}
              onEdit={handleEditSalon}
              onDelete={handleDeleteSalon}
            />
          ) : (
            <SalonTable 
              salons={salons}
              onView={handleViewSalon}
              onEdit={handleEditSalon}
              onDelete={handleDeleteSalon}
            />
          )}

          {/* 페이지네이션 컴포넌트 */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              총 {pagination.totalItems}개의 미용실 중 {(currentPage - 1) * itemsPerPage + 1}-
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
        </>
      )}

    </div>
    </div>
  );
};

export default MySalonsList;