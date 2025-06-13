'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  Layout,
  Box,
  Menu, // 메뉴 아이콘 추가
  X // X 아이콘 추가
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// 모바일 메뉴 오버레이 컴포넌트
const MobileOverlay = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
      onClick={onClose}
    >
      {children}
    </div>
  );
};

const MenuItem = ({ icon: Icon, label, href, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const hasChildren = children && children.length > 0;
  const pathname = usePathname();
  const isActive = href && pathname === href;

  const content = (
    <div 
      className={cn(
        "group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium",
        hasChildren ? "justify-between cursor-pointer" : "hover:bg-accent",
        isActive ? "bg-accent text-accent-foreground" : "transparent"
      )}
      onClick={() => hasChildren && setIsOpen(!isOpen)}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4" />}
        <span>{label}</span>
      </div>
      {hasChildren && (
        <div className="text-muted-foreground">
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full">
      {href ? (
        <Link href={href} className="block w-full">
          {content}
        </Link>
      ) : (
        content
      )}
      {hasChildren && isOpen && (
        <div className="ml-4 mt-1 space-y-1 pl-2 border-l border-border">
          {children}
        </div>
      )}
    </div>
  );
};

const AdminSidebar = () => {
  const [sidebarHeight, setSidebarHeight] = useState('calc(100vh - 60px)');
  const [isOpen, setIsOpen] = useState(false); // 모바일 메뉴 상태
  const sidebarRef = useRef(null);
  
  // 사이드바 높이 조정 함수
  useEffect(() => {
    const updateSidebarHeight = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const newHeight = footerTop - 20;
        
        setSidebarHeight(`${newHeight}px`);
      }
    };
    
    updateSidebarHeight();
    window.addEventListener('resize', updateSidebarHeight);
    
    return () => window.removeEventListener('resize', updateSidebarHeight);
  }, []);

  // 사이드바 내부 클릭 시 이벤트 버블링 중단
  const handleSidebarClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* 모바일 토글 버튼 */}
      <Button 
        variant="outline" 
        size="icon" 
        className="fixed top-4 left-4 z-40 md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* 모바일 오버레이 */}
      <MobileOverlay isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div 
          ref={sidebarRef}
          className="fixed left-0 top-0 bottom-0 w-64 bg-background border-r shadow-lg p-0 transition-transform duration-300 ease-in-out z-50"
          style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
          onClick={handleSidebarClick}
        >
          {/* 모바일 사이드바 헤더 */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-semibold">관리자 메뉴</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* 사이드바 내용 - 스크롤 가능 */}
          <div className="overflow-y-auto h-[calc(100vh-120px)]">
            <div className="px-3 py-2 space-y-4">
              <div className="space-y-1">
                <MenuItem icon={Home} label="대시보드" href="/admin" />
              </div>
              
              <Separator className="my-2" />
              
              <div className="space-y-1">
                <MenuItem icon={Layout} label="사이트 제작/관리" defaultOpen>
                  <MenuItem label="메뉴 관리" href="/admin/menu" />
                  <MenuItem label="사이트 메뉴 관리" href="/admin/site-menu" />
                </MenuItem>
              </div>
              
              <Separator className="my-2" />
              
              <div className="space-y-1">
                <MenuItem icon={Users} label="회원" defaultOpen>
                  <MenuItem label="회원 목록" href="/admin/members" />
                  <MenuItem label="활동 로그" href="/admin/activities" />
                  <MenuItem label="회원 설정" href="/admin/member-settings" />
                </MenuItem>
              </div>
              
              <Separator className="my-2" />
              
              <div className="space-y-1">
                <MenuItem icon={Box} label="콘텐츠">
                  <MenuItem label="광고" href="/admin/ads" />
                  <MenuItem label="스폰서" href="/admin/companies" />
                  <MenuItem label="미용실" href="/admin/salons" />
                  <MenuItem label="전체로그" href="/admin/logs" />
                  <MenuItem label="구독" href="/admin/subscription" />
                  <MenuItem label="H.set" href="/admin/h-set" />
                  <MenuItem label="게시판" href="/admin/boards" />
                  <MenuItem label="페이지" href="/admin/pages" />
                  <MenuItem label="문서" href="/admin/documents" />
                  <MenuItem label="댓글" href="/admin/comments" />
                  <MenuItem label="파일" href="/admin/files" />
                  <MenuItem label="스케줄러" href="/admin/scheduler" />
                  <MenuItem label="휴지통" href="/admin/trash" />
                </MenuItem>
              </div>
              
              <Separator className="my-2" />
              
              <div className="space-y-1">
                <MenuItem icon={Settings} label="설정">
                  <MenuItem label="시스템 설정" href="/admin/system-settings" />
                  <MenuItem label="관리자 화면 설정" href="/admin/admin-settings" />
                  <MenuItem label="시스템 로그 설정" href="/admin/logs" />
                </MenuItem>
              </div>
            </div>
          </div>
          
          {/* 사용자 화면으로 이동 버튼 */}
          <div className="border-t p-4 bg-background mt-auto">
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <Link href="/dashboard">
                <Layout className="h-4 w-4" />
                <span>사용자 화면으로</span>
              </Link>
            </Button>
          </div>
        </div>
      </MobileOverlay>

      {/* 데스크톱 사이드바 (기존 코드) */}
      <div 
        ref={sidebarRef}
        className="hidden md:flex w-64 flex-col border-r bg-background"
        style={{ 
          height: sidebarHeight, 
          maxHeight: sidebarHeight,
          position: 'sticky',
          top: 0
        }}
      >
        {/* 기존 데스크톱 사이드바 코드 유지 */}
        <div className="py-2 px-3 border-b">
          <h2 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
            관리자 메뉴
          </h2>
        </div>
        
        <div 
          className="flex-1 overflow-y-auto" 
          style={{ 
            height: `calc(${sidebarHeight} - 120px)`,
            overflowY: 'auto !important'
          }}
        >
          <div className="px-3 py-2 space-y-4">
            <div className="space-y-1">
              <MenuItem icon={Home} label="대시보드" href="/admin" />
            </div>
            
            <Separator className="my-2" />
            
            <div className="space-y-1">
              <MenuItem icon={Layout} label="사이트 제작/관리" defaultOpen>
                <MenuItem label="메뉴 관리" href="/admin/menu" />
                <MenuItem label="사이트 메뉴 관리" href="/admin/site-menu" />
              </MenuItem>
            </div>
            
            <Separator className="my-2" />
            
            <div className="space-y-1">
              <MenuItem icon={Users} label="회원" defaultOpen>
                <MenuItem label="회원 목록" href="/admin/members" />
                <MenuItem label="활동 로그" href="/admin/activities" />
                <MenuItem label="회원 설정" href="/admin/member-settings" />
              </MenuItem>
            </div>
            
            <Separator className="my-2" />
            
            <div className="space-y-1">
              <MenuItem icon={Box} label="콘텐츠">
                <MenuItem label="광고" href="/admin/ads" />
                <MenuItem label="스폰서" href="/admin/companies" />
                <MenuItem label="미용실" href="/admin/salons" />
                <MenuItem label="전체로그" href="/admin/logs" />
                <MenuItem label="구독" href="/admin/subscription" />
                <MenuItem label="H.set" href="/admin/h-set" />
                <MenuItem label="게시판" href="/admin/boards" />
                <MenuItem label="페이지" href="/admin/pages" />
                <MenuItem label="문서" href="/admin/documents" />
                <MenuItem label="댓글" href="/admin/comments" />
                <MenuItem label="파일" href="/admin/files" />
                <MenuItem label="스케줄러" href="/admin/scheduler" />
                <MenuItem label="휴지통" href="/admin/trash" />
              </MenuItem>
            </div>
            
            <Separator className="my-2" />
            
            <div className="space-y-1">
              <MenuItem icon={Settings} label="설정">
                <MenuItem label="시스템 설정" href="/admin/system-settings" />
                <MenuItem label="관리자 화면 설정" href="/admin/admin-settings" />
                <MenuItem label="시스템 로그 설정" href="/admin/logs" />
              </MenuItem>
            </div>
          </div>
        </div>
        
        <div className="border-t p-4 bg-background mt-auto">
          <Button variant="outline" className="w-full justify-start gap-2" asChild>
            <Link href="/dashboard">
              <Layout className="h-4 w-4" />
              <span>사용자 화면으로</span>
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;