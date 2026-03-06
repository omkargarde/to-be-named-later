import { signUpFromOpts } from "@/types/zod/sign-up-schema";
import { formatFieldName } from "@/utils/string-transformation.client";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/sign-up")({
  component: SignUpPage,
});

function SignUpPage(): React.ReactNode {
  const form = useForm({
    ...signUpFromOpts,
    onSubmit: async function (submittedValues) {
      console.log(submittedValues);
    },
  });

  function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleResetClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    form.reset();
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="card bg-base-200 shadow-xl w-full max-w-md p-6 space-y-4">
        <h1 className="text-3xl font-bold text-center">Sign up</h1>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <form.Field name="firstName">
            {function (field) {
              return (
                <label className="label flex flex-col items-start ">
                  <span className="label-text">{formatFieldName(field.name)}</span>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={function (e) {
                      field.handleChange(e.target.value);
                    }}
                  />
                </label>
              );
            }}
          </form.Field>
          <form.Field name="lastName">
            {function (field) {
              return (
                <label className="label flex flex-col items-start">
                  <span className="label-text">{formatFieldName(field.name)}</span>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={function (e) {
                      field.handleChange(e.target.value);
                    }}
                  />
                </label>
              );
            }}
          </form.Field>
          <form.Field name="email">
            {function (field) {
              return (
                <label className="label flex flex-col items-start">
                  <span className="label-text">{formatFieldName(field.name)}</span>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={function (e) {
                      field.handleChange(e.target.value);
                    }}
                  />
                </label>
              );
            }}
          </form.Field>
          <form.Field name="password">
            {function (field) {
              return (
                <label className="label flex flex-col items-start">
                  <span className="label-text">{formatFieldName(field.name)}</span>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={function (e) {
                      field.handleChange(e.target.value);
                    }}
                  />
                </label>
              );
            }}
          </form.Field>
          <form.Field name="confirmPassword">
            {function (field) {
              return (
                <label className="label flex flex-col items-start">
                  <span className="label-text">{formatFieldName(field.name)}</span>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={function (e) {
                      field.handleChange(e.target.value);
                    }}
                  />
                </label>
              );
            }}
          </form.Field>
          <div className="flex justify-end gap-4 mt-4">
            <button type="reset" className="btn btn-warning btn-lg" onClick={handleResetClick}>
              Reset
            </button>
            <button type="submit" className="btn btn-primary btn-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
