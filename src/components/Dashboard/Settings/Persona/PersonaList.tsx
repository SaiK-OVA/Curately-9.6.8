

import React, { useContext } from "react";
import { userLocalData } from '../../../../shared/services/userData';
import PersonaModal from '../../Resume/People/components/LeftSection/Search/Persona/PersonaModal';
import apiService from '../../Resume/People/shared/api/apiService';
import './PersonaList.scss';

import { debounce } from 'lodash';
import { ModalStore, Store } from "../../Resume/People/components/DataLabs/DataLabs";
import { Loader } from "../../../shared/Loader/Loader";
import { trackPromise } from "react-promise-tracker";
import { showToaster } from "../../../shared/SnackBar/SnackBar";

const Persona = ({ showOnlyPersona = true }: { showOnlyPersona: boolean }) => {

  const [isPersonaLoaded, setIsPersonaLoaded] = React.useState(false);

  const [isManagePersona, setIsManagePerSona] = React.useState(true);
  const [isNewPersona, setIsNewPerSona] = React.useState(false)
  const [isEdit, setIsEdit] = React.useState(false)
  const [isCopy, setIsCopy] = React.useState(false)
  const [labelName, setIsLabelName] = React.useState('')
  const [searchModalData, setSearchModalData] = useContext(ModalStore);
  const [isRefetch, setFetch] = React.useState(false)

  const recrIds = userLocalData.getvalue('invitedAndReferredRecrIds')
  const isChromeExtEnable = userLocalData.isChromeExtensionEnabled();

  // maintain local search state for modal

  const [searchData, setSearchData] = useContext(Store);

  const [personadata, setPersonaData] = React.useState<any[] | never[]>([]);
  const [managePersonadata, setManagePersonaData] = React.useState<[]>([])
  // const [userNameData, setuserNameData] = React.useState<any[] | never[]>([]);

  const [updatePersonaData, setUpdatePersona] = React.useState<[] | null>(null);

  const store = useContext(Store);
  console.log("store in ZPersona", store);

  if (!store) {
    console.log("Error on store")
  }

  const sendPersonaManageData = () => {

    let sendManageData: any = {
      recrId: parseInt(searchData.userId),
      clientId: userLocalData.getvalue('clientId'),
    };

    if (isChromeExtEnable) {
      sendManageData.recrIds = recrIds;
    }
    setIsPersonaLoaded(false);

    trackPromise(
      apiService.PersonaManageData(sendManageData).then((response: any) => {

        if (response.data.Success) {
          setManagePersonaData(response.data.PersonaList)
          setPersonaData(response.data.PersonaList)
        }
        setIsPersonaLoaded(true);
      })
    )
  };

  const refetchPersonData = (value: any) => {
    setFetch(value)
  }

  let sendFilterData;

  const getFilterData = () => {
    let dataObj = Object.keys(searchModalData);
    let sendData: any = {};
    for (var i = 0; i < dataObj.length; i++) {
      if (
        dataObj[i] !== "industry_adv_settings" &&
        dataObj[i] !== "eduDegreeList" &&
        dataObj[i] !== "eduSchoolList" &&
        dataObj[i] !== "eduMajorList" &&
        dataObj[i] !== "autoSkillsList" &&
        dataObj[i] !== "autoLanguagesList" &&
        dataObj[i] !== "autoCertificationsList" &&
        searchModalData[dataObj[i]]
      ) {
        let obj = searchModalData[dataObj[i]];
        if (obj && obj.length) {
          sendData[dataObj[i]] = obj;
        }
        // console.log(obj);
      }

      if (dataObj[i] === "education") {
        let objdegreein = searchModalData[dataObj[i]].degreeIn;
        let objschoolIn = searchModalData[dataObj[i]].schoolIn;
        let objmajorIn = searchModalData[dataObj[i]].majorIn;
        let objeducationStartYear = searchModalData[dataObj[i]].educationStartYear;
        let objeducationEndYear = searchModalData[dataObj[i]].educationEndYear;

        if (
          (objdegreein && objdegreein.length) ||
          (objschoolIn && objschoolIn.length) ||
          (objmajorIn && objmajorIn.length) ||
          objeducationStartYear !== "" ||
          objeducationEndYear !== ""
        ) {
          sendData[dataObj[i]] = searchModalData[dataObj[i]];
        }
      }
      if (dataObj[i] === "distance" && searchModalData.zipcode !== ""
        && searchModalData[dataObj[i]] !== undefined) {
        sendData[dataObj[i]] = searchModalData[dataObj[i]];
      }
      if (dataObj[i] === "hqdistance" && searchModalData.hqzipcode !== ""
        && searchModalData[dataObj[i]] !== undefined) {
        sendData.hq_distance = searchModalData.hqdistance;
        sendData.zipcode = searchModalData.hqzipcode;
        delete sendData.hqzipcode;
      }
    }
    sendData.sort_by = '';
    sendData.page_num = 0;
    sendData.page_size = 10;
    return sendData;
  }

  const sendPersonaCreateData = (userName: string): void => {
    sendFilterData = getFilterData()
    let sendCreateData: any = {
      recrId: parseInt(searchData.userId),
      personaName: userName,
      orderBy: "1",
      filterJson: JSON.stringify(sendFilterData)
    }

    if (isChromeExtEnable) {
      sendCreateData.recrIds = recrIds
    }

    apiService.CreatePersonaData(sendCreateData).then((response: any) => {

      if (response.data.Success && response.data.Status === 200) {
        console.log('PersonaCreateData:', response.data);
        showToaster('Persona saved Succussfully.', 'success');
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          personaIds: [...prevSearchData.personaIds, parseInt(response.data.personaId)],
          checkedPersonas: [...prevSearchData.checkedPersonas, response.data],
        }));
        sendPersonaManageData();
        // sendPersonaData();
      }
    })


  };

  const debouncedSendCreateRequest = debounce(sendPersonaCreateData, 500);

  const getPersonaCreateData = (userName: string) => {
    debouncedSendCreateRequest(userName);
  };

  const sendPersonaEditData = (user: any): void => {
    sendFilterData = getFilterData()

    let sendCreateData: any = {
      personaId: user.personaId,
      personaName: user.personaName,
      filterJson: JSON.stringify(sendFilterData),
      isActive: user.isActive ? 1 : 0
    }

    apiService.EditPersonaData(sendCreateData).then((response: any) => {

      if (response.data.Success && response.data.Status === 200) {
        showToaster('Persona updated Succussfully.', 'success');
        sendPersonaManageData();
        // sendPersonaData();
      }
    })
  };

  React.useEffect(() => {
    // getPersonaData("");
    // sendPersonaData()
    sendPersonaManageData()
    console.log(personadata, 'ddd')
    if (false) {
      getPersonaCreateData("");
    }
  }, [isRefetch]);




  const [open, setOpen] = React.useState(false);

  const handleClose1 = () => setOpen(false);
  const intializeStoreData = () => {
    setSearchModalData((prevSearchData: any) => ({
      ...prevSearchData,
      industries: [],
      industries_not_in: [],
      industry_company_not_in_names: [],
      industry_company_names: [],
      industry_all_company_names: [],
      industry_adv_settings: "",
      company_names: [],
      company_not_in_names: [],
      company_past_names: [],
      exclude_company_names: [],
      no_of_employees: [],
      min: "",
      max: "",
      person_titles: [],
      person_not_titles: [],
      person_past_titles: [],
      title_is_boolean: "",
      title_management_level: [],
      title_department: [],
      title_department_sub_role: [],
      full_name: "",
      minYear: "",
      maxYear: "",
      skillsIn: [],
      languagesIn: [],
      certificationsIn: [],
      booleanSearch: "",
      eduDegreeList: [],
      eduSchoolList: [],
      eduMajorList: [],
      autoSkillsList: [],
      autoLanguagesList: [],
      autoCertificationsList: [],
      education: {
        schoolIn: [],
        majorIn: [],
        degreeIn: [],
        educationStartYear: "",
        educationEndYear: "",
      },
      zipcode: "",
      hqzipcode: "",
      hqdistance: null,
      locations: [],
      locations_not_in: [],
      hq_locations: [],
      hq_locations_not_in: [],
    }));
  }

  const handleCopyPersona = (PersonaId: any): void => {
    setIsManagePerSona(false)
    setIsNewPerSona(PersonaId)
    setIsEdit(false)
    setIsCopy(true)
    const selectedPersona = personadata.find((persona: any) => persona.personaId === PersonaId);

    if (selectedPersona) {
      const labelName = selectedPersona.personaName;
      setIsLabelName(labelName)
      setUpdatePersona(selectedPersona)
      // console.log('isCopy:', labelName);
    }

  }

  const handleEditPersona = (PersonaId: any): void => {
    setIsCopy(false)
    // intializeStoreData()
    setIsManagePerSona(false)
    setIsNewPerSona(PersonaId)
    setIsEdit(PersonaId)


    const selectedPersona = personadata.find((persona: any) => persona.personaId === PersonaId);

    if (selectedPersona) {
      const labelName = selectedPersona.personaName;
      setIsLabelName(labelName)
      // console.log(selectedPersona, 'isEdit:', labelName);
      setUpdatePersona(selectedPersona)
    }
    setOpen(true);
  }

  const handleIsManagePersona = () => {
    setUpdatePersona([]);
    // intializeStoreData();
    setIsManagePerSona(true)
    setIsNewPerSona(false)
    setIsEdit(false)
    setIsCopy(false)
  }

  const handleIsNewPersona = () => {
    intializeStoreData()
    setIsNewPerSona(true)
    setIsManagePerSona(false)
    setIsEdit(false)
    setIsCopy(false)
  }



  return (
    <div id="personaList" className="personaInSettings">
      {
        isPersonaLoaded ?
          <PersonaModal
            isNewPersona={isNewPersona}
            isManagePersona={isManagePersona}
            handleIsNewPersona={handleIsNewPersona}
            handleClose1={handleClose1}
            handleIsManagePersona={handleIsManagePersona}
            isEdit={isEdit}
            labelName={labelName}
            handleEditPersona={handleEditPersona}
            handleCopyPersona={handleCopyPersona}
            isCopy={isCopy}
            managePersonadata={managePersonadata}
            refetchPersonData={refetchPersonData}
            isRefetch={isRefetch}
            updatePersonaData={updatePersonaData}
            sendPersonaEditData={sendPersonaEditData}
            sendPersonaCreateData={sendPersonaCreateData}
            showOnlyPersona={showOnlyPersona}
          />
          :
          <Loader />
      }
    </div>
  )
}

export default Persona;