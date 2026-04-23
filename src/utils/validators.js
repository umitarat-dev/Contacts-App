
export const isDuplicatePhone = (users, phoneNumber, editId = null) => {
  return users.some(
    (user) =>
      user.phone_number === phoneNumber && user.id !== editId
  );
};
