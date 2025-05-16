
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CircleCheck,
  CircleX,
  Clock,
  Search,
  Filter,
  ChevronDown,
  Users,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import PageLayout from "../../components/layout/PageLayout";

// Mock data for demonstration
const mockPensioners = [
  {
    id: "1",
    name: "Ramesh Kumar",
    aadhaarNumber: "123456789012",
    lastVerified: new Date(2023, 3, 15),
    status: "success",
  },
  {
    id: "2",
    name: "Suresh Patel",
    aadhaarNumber: "234567890123",
    lastVerified: new Date(2023, 4, 10),
    status: "pending",
  },
  {
    id: "3",
    name: "Priya Sharma",
    aadhaarNumber: "345678901234",
    lastVerified: new Date(2023, 4, 1),
    status: "failed",
  },
  {
    id: "4",
    name: "Anita Desai",
    aadhaarNumber: "456789012345",
    lastVerified: new Date(2023, 4, 5),
    status: "success",
  },
  {
    id: "5",
    name: "Raj Singh",
    aadhaarNumber: "567890123456",
    lastVerified: new Date(2023, 3, 28),
    status: "pending",
  },
];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CircleCheck className="h-5 w-5 text-secondary" />;
      case "failed":
        return <CircleX className="h-5 w-5 text-danger" />;
      case "pending":
        return <Clock className="h-5 w-5 text-accent" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "success":
        return "Verified";
      case "failed":
        return "Failed";
      case "pending":
        return "Pending";
      default:
        return "Unknown";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-50 text-secondary";
      case "failed":
        return "bg-red-50 text-danger";
      case "pending":
        return "bg-orange-50 text-accent";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const filteredPensioners = mockPensioners.filter((pensioner) => {
    const matchesSearch =
      searchQuery === "" ||
      pensioner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pensioner.aadhaarNumber.includes(searchQuery);

    const matchesStatus =
      statusFilter === null || pensioner.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (id: string) => {
    navigate(`/admin/pensioner/${id}`);
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-primary-800">
            Administrator Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Pensioners
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center">
                <Users className="h-8 w-8 text-primary mr-2" />
                <span className="text-2xl font-bold">{mockPensioners.length}</span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Verified Pensioners
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center">
                <CircleCheck className="h-8 w-8 text-secondary mr-2" />
                <span className="text-2xl font-bold">
                  {mockPensioners.filter((p) => p.status === "success").length}
                </span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Pending Verifications
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center">
                <Clock className="h-8 w-8 text-accent mr-2" />
                <span className="text-2xl font-bold">
                  {mockPensioners.filter((p) => p.status === "pending").length}
                </span>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pensioners List</CardTitle>
              <CardDescription>
                View and manage all registered pensioners
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative w-full md:w-1/2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search by name or Aadhaar..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      {statusFilter ? `Filter: ${getStatusText(statusFilter)}` : "Filter"}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("success")}>
                      Verified
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                      Pending
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("failed")}>
                      Failed
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Aadhaar Number</TableHead>
                      <TableHead>Last Verified</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPensioners.length > 0 ? (
                      filteredPensioners.map((pensioner) => (
                        <TableRow key={pensioner.id}>
                          <TableCell className="font-medium">
                            {pensioner.name}
                          </TableCell>
                          <TableCell>{pensioner.aadhaarNumber}</TableCell>
                          <TableCell>{formatDate(pensioner.lastVerified)}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(pensioner.status)}
                              <span
                                className={`text-xs rounded-full px-2 py-1 font-medium ${getStatusClass(
                                  pensioner.status
                                )}`}
                              >
                                {getStatusText(pensioner.status)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetails(pensioner.id)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          No pensioners found matching your search criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminDashboard;
