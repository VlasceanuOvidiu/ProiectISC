import React from "react";
import photo1 from "../../src/assets/sex_masculin_bpm.png";
import photo2 from "../../src/assets/sex_feminin_bpm.png";

function Info() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-16">
      <h1 className="text-center mr-16 text-4xl font-bold">
        Tabel valori normale{" "}
      </h1>
      <div className="flex flex-col md:flex-row justify-center items-center gap-20">
        <div>
          <h1 className="text-center mb-6 text-2xl font-bold">
            Valori puls barbati
          </h1>
          <img src={photo1} alt="" />
        </div>
        <div>
          <h1 className="text-center  mb-6 text-2xl font-bold">
            Valori puls femei
          </h1>
          <img src={photo2} alt="" />
        </div>
      </div>
      <h1>*tabelele cu valori sunt furnizate de catre Sc. MedLife Sa.</h1>
    </div>
  );
}

export default Info;
