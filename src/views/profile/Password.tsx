import { Formik } from "formik";
import { InputPassword } from "../../components/InputPassword";
import { CustomErrorMessage } from "../../components/CustomErrorMessage";
import {updatePassword} from "../../actions/get-error-forms";

interface PasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const Password = () => {
  const passwordForm: PasswordForm = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  return (
    <div className="bg-white p-4 rounded-xl">
      <h1 className="text-center font-semibold text-xl">Cambiar contraseña</h1>
      <p className="text-base font-normal px-10 my-4">
        La contraseña debe tener mínimo 8 caracteres, una letra mayúscula, una
        minúscula, un número y un carácter especial {`(= >?:;'{})`}.
      </p>
      <Formik
        initialValues={passwordForm}
        onSubmit={async (formLike, { setSubmitting }) => {
          console.log({ formLike });

          setSubmitting(false);
        }}
        validationSchema={updatePassword}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,

          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
          <div className="w-1/2 mx-auto flex flex-col gap-4">
            <label htmlFor="oldPassword">Escribe tu contraseña antigua.</label>
            <InputPassword
              password={values.oldPassword}
              id="oldPassword"
              name='oldPassword'
              changeText={handleChange("oldPassword")}
              onBlur={handleBlur("oldPassword")}
            />
            <CustomErrorMessage
              name="oldPassword"
              errors={errors}
              touched={touched}
            />
            <label htmlFor="newPassword">Escribe tu nueva contraseña.</label>
            <InputPassword
              password={values.oldPassword}
              id="newPassword"
              name="newPassword"
              changeText={handleChange("newPassword")}
              onBlur={handleBlur("newPassword")}
            />
            <CustomErrorMessage
              name="newPassword"
              errors={errors}
              touched={touched}
            />
            <label htmlFor="confirmPassword">
              Vuelve a repetir tu nueva contraseña.
            </label>
            <InputPassword
              password={values.oldPassword}
              id="confirmPassword"
              name="confirmPassword"
              changeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
            />
            <CustomErrorMessage
              name="confirmPassword"
              errors={errors}
              touched={touched}
            />
            <button
              disabled={isSubmitting}
              onClick={() => handleSubmit()}
              type="button"
              className="bg-primary text-center p-4 rounded-xl cursor-pointer hover:bg-primary/60 text-white font-semibold"
            >
              Actualizar contraseña
            </button>
          </div>
        )}
      </Formik>
    </div>
  );
};
