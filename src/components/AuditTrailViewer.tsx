import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, User, Clock, AlertCircle } from "lucide-react";

interface AuditLog {
  id: string;
  action: string;
  table_name: string;
  old_values: any;
  new_values: any;
  reason: string;
  created_at: string;
  admins?: { full_name: string };
}

export const AuditTrailViewer = ({ recordId, tableName }: { recordId: string; tableName: string }) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuditLogs();
  }, [recordId]);

  const fetchAuditLogs = async () => {
    const { data } = await supabase
      .from("audit_log")
      .select("*, admins(full_name)")
      .eq("record_id", recordId)
      .eq("table_name", tableName)
      .order("created_at", { ascending: false });
    
    if (data) setLogs(data);
    setLoading(false);
  };

  if (loading) return <div className="text-sm text-gray-500">Loading audit trail...</div>;
  if (logs.length === 0) return null;

  return (
    <Card className="p-4 bg-blue-50 border-blue-200">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="h-4 w-4 text-blue-600" />
        <h4 className="font-semibold text-blue-900">Audit Trail</h4>
        <Badge variant="outline" className="ml-auto">{logs.length} changes</Badge>
      </div>
      <ScrollArea className="h-[200px]">
        <div className="space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="bg-white p-3 rounded-lg border text-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3 text-gray-500" />
                  <span className="font-medium">{log.admins?.full_name || "System"}</span>
                  <Badge variant="secondary" className="text-xs">{log.action}</Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {new Date(log.created_at).toLocaleString()}
                </div>
              </div>
              {log.reason && (
                <div className="flex items-start gap-2 mb-2 text-xs text-gray-700">
                  <AlertCircle className="h-3 w-3 mt-0.5 text-yellow-600" />
                  <span><strong>Reason:</strong> {log.reason}</span>
                </div>
              )}
              {log.old_values && log.new_values && (
                <div className="text-xs space-y-1 mt-2 pt-2 border-t">
                  {Object.keys(log.new_values).map((key) => {
                    if (log.old_values[key] !== log.new_values[key]) {
                      return (
                        <div key={key} className="flex gap-2">
                          <span className="font-medium text-gray-600">{key}:</span>
                          <span className="text-red-600 line-through">{String(log.old_values[key])}</span>
                          <span>→</span>
                          <span className="text-green-600">{String(log.new_values[key])}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
