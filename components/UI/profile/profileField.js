const ProfileField = ({ label, value }) => {
  return (
    <div className="profileField">
      <h3 className="profileField__label">{label}</h3>
      <h2 className="profileField__value">{value}</h2>
    </div>
  );
};

export default ProfileField;
