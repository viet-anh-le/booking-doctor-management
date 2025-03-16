export const generateSevenDay = () => {
  const today = new Date(); // Ngày hiện tại
  const sevenDay = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i); // Tăng ngày lên từng ngày

    // Lấy tên ngày trong tuần (Monday, Tuesday, ...)
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    // Định dạng ngày theo "dd/MM/yyyy"
    const formattedDate = date.toLocaleDateString("en-GB").split('/').join('/');

    sevenDay.push({
      day: dayName,
      date: formattedDate
    });
  }

  return sevenDay;
};
