import { MlaInfo } from "../types/MlaInfo";
import MlaItem from "./MlaItem";

const MlaInfoCard: React.FC<{ mlaInfo: MlaInfo }> = ({ mlaInfo }) => {
  return (
    <>
      {mlaInfo.name && <MlaItem label="Name:" value={mlaInfo.name} />}
      {mlaInfo.email && <MlaItem label="Email:" value={mlaInfo.email} />}
      {mlaInfo.districtName && (
        <MlaItem label="District:" value={mlaInfo.districtName} />
      )}
      {mlaInfo.offices && (
        <div>
          <b>Offices:</b>
          <ul>
            {mlaInfo.offices.map(
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
export default MlaInfoCard;
