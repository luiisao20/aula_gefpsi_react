import * as Yup from "yup";

const regex = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
  text: /^[^\s][\p{L}\p{M}\d\s.,;:!?()"'¿¡-]*[^\s]$/u,
};

export const updatePassword = Yup.object().shape({
  oldPassword: Yup.string().required("El campo no puede estar vacío"),

  newPassword: Yup.string()
    .matches(
      regex.password,
      "La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un caracter especial (!'&+-,./-@?:;)"
    )
    .required("Debes ingresar una contraseña"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Las contraseñas deben coincidir")
    .required("Debes repetir tu contraseña"),
});

export const moduleForm = Yup.object().shape({
  title: Yup.string()
    .matches(regex.text)
    .required("El título es obligatorio"),

  number: Yup.number()
    .required("El número del módulo es obligatorio"),

  professor: Yup.string()
    .matches(regex.text)
    .required("El nombre del profesor es obligatorio"),

  subject: Yup.string()
    .matches(regex.text)
    .required("La materia es obligatoria"),
});
