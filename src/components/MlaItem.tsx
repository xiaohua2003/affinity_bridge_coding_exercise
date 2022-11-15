const MlaItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  return (
    <div>
      <b>{label}</b>
      <p>{value}</p>
    </div>
  );
};

export default MlaItem;
