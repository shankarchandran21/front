import * as yup from "yup";

export const schema = yup.object({
  title: yup.string().required("Task title is required").min(3, "Minimum 3 characters"),
  status: yup.string().required("Status is required"),
  category: yup.string().required("Category is required"),
  dueDate: yup
    .object()
    .shape({
      day: yup.number().required("Day is required"),
      month: yup.number().required("Month is required"),
      year: yup.number().required("Year is required"),
    })
    .nullable()
    .required("Due Date is required"),
}).required();
