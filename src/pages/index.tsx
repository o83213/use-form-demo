import { useState } from "react";
import { useForm, Validate } from "react-hook-form";
const defaultValues = {
  name: "",
  gender: "",
  age: 0,
};

let a: { [key: string]: string } = {};
a.name = "123";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });
  const [formValues, setFormValues] = useState(defaultValues);
  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log("form data: ", data);
          setFormValues(data);
        })}
      >
        <label>
          Name:
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              validate: (value) => !value.includes("@") || "不可以有@符號!",
              pattern: {
                // value: /^[a-zA-Z0-9\u4E00-\u9FFF]+$/,
                value: /[^\u5abd\u7238]+$/g,
                message: "不可以提老母!",
              },
            })}
          />
        </label>
        {errors.name && <p style={{ color: "#f00" }}>{errors.name.message}</p>}
        <br></br>
        <label>
          Gender:
          <select {...register("gender")}>
            <option value="1">Male</option>
            <option value="2">Femal</option>
          </select>
        </label>
        <br></br>
        <label>
          Age:
          <input
            type="number"
            {...register("age", {
              required: "Age is required",
              max: {
                message: "Must be less than 60",
                value: 60,
              },
              min: {
                message: "Must be greater than 0",
                value: 1,
              },
            })}
          />
        </label>
        {errors.age && <p style={{ color: "#f00" }}>{errors.age.message}</p>}
        <button type="submit">submit!</button>
      </form>
      <div>
        <h3>Current Form Value:</h3>
        <div>{JSON.stringify(formValues)}</div>
      </div>
    </div>
  );
}
