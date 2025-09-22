const Footer = ({
  activeTaskCount = 0,
  completedTaskCount = 0,
}: {
  activeTaskCount: number;
  completedTaskCount: number;
}) => {
  return (
    <div className="text-center text-muted-foreground text-sm">
      {completedTaskCount !== 0 && activeTaskCount === 0 && (
        <span>
          🎉 Tuyệt vời! Bạn đã hoàn thành tất cả {completedTaskCount} công
          việc!!!
        </span>
      )}
      {activeTaskCount !== 0 && completedTaskCount === 0 && (
        <span>
          🎉 Cố lên! Bạn còn {activeTaskCount} công việc cần phải làm nữa đó!
        </span>
      )}
      {completedTaskCount !== 0 && activeTaskCount !== 0 && (
        <span>
          🎉 Tuyệt vời! Bạn đã hoàn thành {completedTaskCount} việc, còn{" "}
          {activeTaskCount} việc nữa thôi. Cố lên!
        </span>
      )}
      {completedTaskCount === 0 && activeTaskCount === 0 && (
        <span>
          🎉 Bạn không có công việc nào cần làm!. Ấn vào "Thêm" đễ thêm công
          việc nhé.
        </span>
      )}
    </div>
  );
};

export default Footer;
