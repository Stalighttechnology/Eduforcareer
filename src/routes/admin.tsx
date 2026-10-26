import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  component: () => <Navigate to="/eduadmin" replace />,
});

export default function AdminPage() {
  return <Navigate to="/eduadmin" replace />;
}
