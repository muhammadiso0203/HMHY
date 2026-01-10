import { useEffect, useState } from "react";

import LoadingSpinner from "@/components/loading";
import { getTeachers } from "../service/query/getTeachers";
import TeacherCard from "./components/teacherUi";
import TeacherSearch from "./components/teacherSearch";

const Teachers = () => {
  const { data = [], isLoading, isError } = getTeachers();

  const [filteredTeachers, setFilteredTeachers] = useState(data);

  useEffect(() => {
    setFilteredTeachers(data);
  }, [data]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error</div>;

  return (
    <div className="p-6 space-y-4 w-400">
      <TeacherSearch
        teachers={data}
        onSearchResult={setFilteredTeachers}
      />

      {filteredTeachers.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          Teacher topilmadi
        </div>
      ) : (
        filteredTeachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))
      )}
    </div>
  );
};

export default Teachers;
