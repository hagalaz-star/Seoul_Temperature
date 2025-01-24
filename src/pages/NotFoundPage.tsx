interface NotFoundProps {
  message?: string;
}

const NotFoundPage = ({
  message = "데이터를 찾을 수 없습니다",
}: NotFoundProps) => {
  return (
    <div className="not-found-container">
      <p>{message}</p>
    </div>
  );
};

export default NotFoundPage;
