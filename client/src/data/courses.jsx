/* eslint-disable no-unused-vars */
import { Badge } from "@/components/ui/badge";
import DeleteDialog from "@/components/common/DeleteDialog";
import { deleteCourse } from "@/redux/courseSlice";


export const adminCourseTableColumns = [
  {
    header: "Course Platform",
    accessorKey: "coursePlatform"
  },
  {
    header: "Course Name",
    accessorKey: "courseName",
  },

  {
    header: "Student name",
    accessorKey: "student[name]",
    accessorFn: (row) => {
      console.log(row)
      return row.student.name
    },
    cell: ({ row }) => {
      return <p>{row.original.student.name}</p>;
    },
  },
  {
    header: "Roll No",
    accessorKey: "student[rollNumber]",
    accessorFn: (row) => {
      console.log(row)
      return row.student.rollNumber
    },
    cell: ({ row }) => {
      return <p>{row.original.student.rollNumber}</p>;
    },
  },
  {
    header: "Branch",
    accessorKey: "student[branch]",
    accessorFn: (row) => {
      console.log(row)
      return row.student.branch
    },
    cell: ({ row }) => {
      return <p>{row.original.student.branch}</p>
    }
  },
  {
    header: "Completion Status",
    accessorKey: "completionStatus",
    cell: ({ row }) => {
      const completionStatus = row.original.completionStatus;
      return (
        <Badge variant={completionStatus == "Pending" ? "outline" : "default"}
          className={completionStatus == "Completed" && "bg-green-500 hover:bg-green-600"}
        >{row.original.completionStatus}</Badge>
      )
    }
  },
  {
    header: "Course Link",
    cell: ({ row }) => {
      return (
        <a href={row.original.courseLink} target="_blank" rel="noreferrer">
          <Badge>View</Badge>
        </a>
      );
    },
  },
  {
    header: "Delete",
    id: "DeleteAction",
    enableHiding: false,
    cell: ({ row }) => {
      const course = row.original;
      return (
        <div className="flex">
          <DeleteDialog
            type="course"
            dialogTitle={"Are you sure to delete course details"}
            data={course}
            dialogDescription={
              "This action is irreversible click delete to delete the details permanently"
            }
            handleDelete={deleteCourse}
          />
        </div>
      );
    },
  },
];

export const studentCourseTableColumns = [
  {
    header: "Course Platform",
    accessorKey: "coursePlatform"
  },
  {
    header: "Course Name",
    accessorKey: "courseName",
  },
  {
    header: "Completion Status",
    accessorKey: "completionStatus",
    cell: ({ row }) => {
      const completionStatus = row.original.completionStatus;
      return (
        <Badge variant={completionStatus == "Pending" ? "outline" : "default"}
          className={completionStatus == "Completed" && "bg-green-500 hover:bg-green-600"}
        >{row.original.completionStatus}</Badge>
      )
    }
  },
  {
    header: "Course Link",
    cell: ({ row }) => {
      return (
        <a href={row.original.courseLink} target="_blank" rel="noreferrer">
          <Badge>View</Badge>
        </a>
      );
    },
  },
  {
    header: "Delete",
    id: "DeleteAction",
    enableHiding: false,
    cell: ({ row }) => {
      const course = row.original;
      return (
        <div className="flex">
          <DeleteDialog
            type="course"
            dialogTitle={"Are you sure to delete course details"}
            data={course}
            dialogDescription={
              "This action is irreversible click delete to delete the details permanently"
            }
            handleDelete={deleteCourse}
          />
        </div>
      );
    },
  },

];

export const profileCourseColumns = [
  {
    header: "Course Platform",
    accessorKey: "coursePlatform"
  },
  {
    header: "Course Name",
    accessorKey: "courseName",
  },
  {
    header: "Completion Status",
    accessorKey: "completionStatus",
    cell: ({ row }) => {
      const completionStatus = row.original.completionStatus;
      return (
        <Badge variant={completionStatus == "Pending" ? "outline" : "default"}
          className={completionStatus == "Completed" && "bg-green-500 hover:bg-green-600"}
        >{row.original.completionStatus}</Badge>
      )
    }
  },
  {
    header: "Course Link",
    cell: ({ row }) => {
      return (
        <a href={row.original.courseLink} target="_blank" rel="noreferrer">
          <Badge>View</Badge>
        </a>
      );
    },
  },
  {
    header: "Delete",
    id: "DeleteAction",
    enableHiding: false,
    cell: ({ row }) => {
      const course = row.original;
      return (
        <div className="flex">
          <DeleteDialog
            type="course"
            dialogTitle={"Are you sure to delete course details"}
            data={course}
            dialogDescription={
              "This action is irreversible click delete to delete the details permanently"
            }
            handleDelete={deleteCourse}
          />
        </div>
      );
    },
  },
];