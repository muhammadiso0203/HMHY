import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import type { ITeacher } from "../../types";



interface Props {
  teachers: ITeacher[];
  onSearchResult: (filtered: ITeacher[]) => void;
}

const TeacherSearch = ({
  teachers,
  onSearchResult,
}: Props) => {
  const [search, setSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);

    const filtered = teachers.filter((teacher) =>
      `${teacher.fullName} ${teacher.email} ${teacher.description ?? ""}`
    
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    onSearchResult(filtered);
  };

  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-semibold">Teachers</h1>

        <Input
          placeholder="Search by name, email or bio"
          className="h-10 bg-white"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <Button variant="outline" className="gap-2 bg-white" onClick={() => navigate('deleted')}>
          <Trash2 className="w-4 h-4" />
          O‘chirilgan Teacher’lar
        </Button>
      </div>
    </div>
  );
};

export default TeacherSearch;
