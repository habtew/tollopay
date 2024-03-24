import { useMemo } from "react";
import "./PaymentMethodsSection.css";

const PaymentMethodsSection = ({
  accountName,
  bankAccountName,
  profileIconTop,
  profileIconLeft,
}) => {
  const groupDivStyle = useMemo(() => {
    return {
      top: profileIconTop,
      left: profileIconLeft,
    };
  }, [profileIconTop, profileIconLeft]);

  return (
    <div className="payment-method-container" style={groupDivStyle}>
      <div className="bank-detail">
        <img className="payment-profile-icon" alt="" src="/profile-icon.svg" />
        <div className="canara-bank">{accountName}</div>
        <img className="right-arrow-icon" alt="" src="/rightarrow-1@2x.png" />
      </div>
    </div>
  );
};

export default PaymentMethodsSection;
