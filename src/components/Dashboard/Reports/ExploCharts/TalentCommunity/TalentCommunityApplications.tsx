import UseExplo from "../UseExplo"

const TalentCommunityApplications = () => {

  const { jwt } = UseExplo({ embedID: 'P8xK0ny1oZ' })
  return (
    <>
      {
        jwt && (
          <explo-dashboard
            dash-jwt={jwt}
            updateUrlParams={true}
            isProduction={true}
          />
        )
      }
    </>
  )
}

export default TalentCommunityApplications
