import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Artikel</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">12</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lowongan Aktif</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">4</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hero Slides</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">3</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Admin</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">2</CardContent>
      </Card>
    </div>
  );
}
