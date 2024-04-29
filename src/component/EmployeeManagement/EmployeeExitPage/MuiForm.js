import dayjs from "dayjs";
import { Formik, Form } from "formik";
import { object, date } from "yup";
import FormikMuiDatePicker from "./MuiDatePicker";

const MuiForm = () => {
  const eighteen_years_ago = dayjs().subtract(18, "year");

  const schema = object({
    birthdate: date().max(
      eighteen_years_ago,
      "You must be at least 18 years old to register"
    ),
  });
  return (
    <div>
      <Formik
        initialValues={{ birthdate: eighteen_years_ago }}
        onSubmit={(values) => {
          console.log(values.birthdate.$y);
        }}
        validationSchema={schema}
      >
        <Form className="flex flex-col align-strech gap-2">
          {/* here we just need to specify the name */}
          <FormikMuiDatePicker name="birthdate" />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default MuiForm;

