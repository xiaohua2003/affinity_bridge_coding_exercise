import { MlaInfo } from "../types/MlaInfo";
import MlaItem from "./MlaItem";

const MlaInfoCard2 = (props: MlaInfo) => {
  const { name, email, districtName, offices } = props;
  return (
    <>
      {name && <MlaItem label="Name:" value={name} />}
      {email && <MlaItem label="Email:" value={email} />}
      {districtName && <MlaItem label="District:" value={districtName} />}
      {offices && (
        <div>
          <b>Offices:</b>
          <ul>
            {offices.map(
              (office, i) =>
                (office.postal || office.tel) && (
                  <li key={i}>
                    <p>{office.postal && office.postal} </p>
                    <p>{office.tel && office.tel}</p>
                  </li>
                )
            )}
          </ul>
        </div>
      )}
    </>
  );
};
export default MlaInfoCard2;
