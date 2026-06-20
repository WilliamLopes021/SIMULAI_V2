export function handleApiError(error, defaultMessage) {
  if (error.response) {
    console.log(error?.message)
    return new Error(error.response.data?.message || defaultMessage);
  } else if (error.request) {
    return new Error("Sem resposta do servidor.");
  } else {
    return new Error(defaultMessage);
  }
}
