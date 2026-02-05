import { useContext, useState } from "react";
import { AuthContext } from "../../../context/auth/AuthContext";
import { userService } from "../../../services/user.service";

type EditableField = "name" | "email" | "mobile" | null;

export default function UserInfoSection() {
  const auth = useContext(AuthContext)!;
  const { user, setUser } = auth;

  const [name, setName] = useState(user!.name);
  const [email, setEmail] = useState(user!.email);
  const [mobile, setMobile] = useState(user!.mobile || "");

  // which field is currently being edited
  const [editingField, setEditingField] = useState<EditableField>(null);
  const [saving, setSaving] = useState(false);

  const saveField = async () => {
    try {
      setSaving(true);

      const res = await userService.updateMe({
        name,
        email,
        mobile,
      });

      setUser(res.data.user);
      setEditingField(null);
    } catch {
      alert("Failed to update user info");
    } finally {
      setSaving(false);
    }
  };

  const renderRow = (
    rowIcon: string,
    label: string,
    value: string,
    field: EditableField,
    setter: (v: string) => void
  ) => (
    <div className="js-profile-user-row">
      {/* <span className="js-profile-user-label">{label}</span> */}

      <span className="material-symbols-outlined js-profile-user-icon-detail">
        {rowIcon}
      </span>
      <div className="js-profile-user-value-box">
        {editingField === field ? (
          <input
            value={value}
            className={`js-profile-user-value-input ${
              label == "Name" ? "js-profile-user-value-input-name" : ""
            }`}
            onChange={(e) => setter(e.target.value)}
            autoFocus
          />
        ) : (
          <span
            className={`js-profile-user-value ${
              label == "Name" ? "js-profile-user-value-name" : ""
            }`}
          >
            {value || "-"}
          </span>
        )}
      </div>

      <div className="js-profile-user-action">
        {editingField === field ? (
          <span
            onClick={saveField}
            className="material-symbols-outlined js-profile-user-icon js-profile-user-check"
          >
            check
          </span>
        ) : (
          <span
            className="material-symbols-outlined js-profile-user-icon js-profile-user-edit"
            onClick={() => setEditingField(field)}
          >
            edit
          </span>
        )}
      </div>
    </div>
  );

  return (
    <section className="js-profile-user-section">
      {renderRow("Account_circle", "Name", name, "name", setName)}
      {renderRow("Mail", "Email", email, "email", setEmail)}
      {renderRow("Call", "Mobile", mobile, "mobile", setMobile)}

      {saving && <p className="js-profile-user-saving-text">Saving...</p>}
    </section>
  );
}
