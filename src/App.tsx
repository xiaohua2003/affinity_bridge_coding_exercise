import React, { useEffect, useState } from "react";
import useFetchFromApi from "./hooks/useFetchFromApi";
import { MlaInfo } from "./types/MlaInfo";
import MlaInfoCard from "./components/MlaInfoCard";

function App() {
  const [mlaInfo, setMlaInfo] = useState<MlaInfo | null>(null);
  const [postalCode, setPostalCode] = useState("");
  const [toFetch, setToFetch] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const baseUrl = "https://represent.opennorth.ca/postcodes/";
  const Url = `${baseUrl}${postalCode.toUpperCase()}`;
  const { data, isPending, error } = useFetchFromApi<
    Object & { representatives_centroid: [] }
  >(Url, toFetch);

  useEffect(() => {
    if (data) {
      const representativesCentroids = data.representatives_centroid;
      representativesCentroids.forEach((val: Record<string, unknown>) => {
        if (val.elected_office === "MLA" || val.elected_office === "MPP") {
          setMlaInfo({
            name: val.name,
            email: val.email,
            photoUrl: val.photo_url,
            districtName: val.district_name,
            offices: val.offices,
          } as MlaInfo);
        }
      });
    }
  }, [data]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const postalCodeValue = event.target.value;
    setPostalCode(postalCodeValue);
    const postalCodeRegex = new RegExp(
      /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
    );
    if (postalCodeValue.length === 6 && postalCodeRegex.test(postalCodeValue)) {
      setIsValid(true);
      setToFetch(true);
    } else {
      setToFetch(false);
      setMlaInfo(null);
      setIsValid(false);
    }
  };

  return (
    <div style={{ margin: "auto", marginTop: "5rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "2rem",
        }}
      >
        <label>Find Your MLA</label>
        <input
          style={{ width: "15rem", height: "2rem", marginTop: "0.8rem" }}
          value={postalCode}
          name="postalCode"
          onChange={onInputChange}
          maxLength={6}
        />
        {postalCode.length !== 6 && (
          <p>Enter a valid Postal Code (length should be 6)</p>
        )}
        {postalCode.length === 6 && !isValid && (
          <p style={{ color: "red" }}> Postal Code you entered is not valid</p>
        )}
        {error && <p>{error}</p>}
        {isPending && <p>Loading...</p>}
      </div>
      {mlaInfo && (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img src={mlaInfo.photoUrl} alt="mlaPhoto" height="200" />
          <div style={{ marginLeft: "2rem" }}>
            <MlaInfoCard mlaInfo={mlaInfo} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
