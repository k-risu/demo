// /components/admin/ads/AdScheduleTab.js
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, PlusCircle, XCircle, Calendar, AlarmClock } from 'lucide-react';

export const AdScheduleTab = ({
  formData,
  editMode,
  onAddSchedule,
  onUpdateSchedule,
  onRemoveSchedule,
  onSubmit,
  isLoading
}) => {
  // 시간대 표시를 12시간제로 변환
  const formatTime = (timeString) => {
    if (!timeString) return "12:00";
    
    const time = timeString.slice(0, 5);
    const [hours, minutes] = time.split(':');
    
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? '오후' : '오전';
    const hour12 = hour % 12 || 12;
    
    return `${ampm} ${hour12}:${minutes}`;
  };

  return (
    <Card className="shadow-sm border-border">
      <CardHeader className="bg-card dark:bg-card/5 border-b border-border">
        <div className="flex items-center justify-between pb-4">
          <div>
            <CardTitle className="text-xl font-bold text-foreground">광고 스케줄</CardTitle>
            <CardDescription className="mt-1 text-muted-foreground">광고 표시 일정 관리</CardDescription>
          </div>
          <Badge variant="outline" className="font-medium border-border text-foreground">
            {formData.schedules.length}개 일정
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {formData.schedules.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 bg-muted/40 dark:bg-muted/20 rounded-lg border-2 border-dashed border-muted">
            <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground mb-2">등록된 스케줄이 없습니다</p>
            {editMode && (
              <Button 
                variant="outline" 
                onClick={onAddSchedule}
                className="mt-2 border-border text-foreground hover:bg-muted"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                스케줄 추가
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {formData.schedules.map((schedule, index) => (
                <div 
                  key={index} 
                  className={`relative rounded-lg border border-border overflow-hidden transition-all group ${
                    editMode ? "hover:border-primary dark:hover:border-primary hover:shadow-md" : "bg-card dark:bg-card/20"
                  }`}
                >
                  {editMode ? (
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                          <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-medium text-foreground">시간 설정</h3>
                      </div>
                      
                      <div className="relative mt-2">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <AlarmClock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                          type="time"
                          value={schedule.time ? schedule.time.slice(0, 5) : "12:00"}
                          onChange={(e) => onUpdateSchedule(index, e.target.value + ":00")}
                          className="pl-10 transition-all focus:ring-2 focus:ring-ring border-input bg-background"
                        />
                      </div>
                      
                      <div className="flex justify-end mt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveSchedule(index)}
                          className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          삭제
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-3">
                          <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-sm text-muted-foreground">광고 표시 시간</h4>
                          <p className="text-lg font-medium text-foreground">{formatTime(schedule.time)}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/30">
                        {schedule.time ? schedule.time.slice(0, 5) : "12:00"}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}

              {editMode && (
                <div 
                  onClick={onAddSchedule}
                  className="cursor-pointer rounded-lg border-2 border-dashed border-muted p-4 flex flex-col items-center justify-center h-full min-h-32 hover:bg-muted/20 dark:hover:bg-muted/10 transition-colors"
                >
                  <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-muted-foreground font-medium">새 스케줄 추가</span>
                </div>
              )}
            </div>

            {editMode && formData.schedules.length > 0 && (
              <>
                <Separator className="my-6 bg-border" />
                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    onClick={onSubmit} 
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
                  >
                    {isLoading ? "저장 중..." : "변경사항 저장"}
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};