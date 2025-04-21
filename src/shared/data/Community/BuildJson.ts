import { userLocalData } from "../../services/userData";

const MASTER_JSON_COMMUNITY = {
    "IndexIdsToSearchInto": [
        (import.meta.env.VITE_ENV === "dev" ? "dev_" : import.meta.env.VITE_ENV === "qa" ? "qa_" : "") + "curately_" + userLocalData.getvalue('clientId')
    ],
    "CategoryWeights": [
    ],
    "PaginationSettings": {
        "Skip": 0,
        "Take": 50
    },
    "Settings": {
        "PositionTitlesMustHaveAnExactMatch": false,
        "PositionTitlesIgnoreSingleWordVariations": false
    },
    "FilterCriteria": {
        "RevisionDateRange": {
            "Minimum": "2020-06-23",
            "Maximum": ""
        },
        "DocumentIds": [
            ""
        ],
        "CustomValueIds": [
        ],
        "CustomValueIdsMustAllExist": true,
        "LocationCriteria": {
            "Locations": [{
                "CountryCode": "",
                "Region": "",
                "Municipality": "",
                "PostalCode": "",
                "GeoPoint": {
                    "Latitude": 0,
                    "Longitude": 0
                }
            }],
            "Distance": 0,
            "DistanceUnit": "Miles",
            "GeocodeProvider": "Google",
            "GeocodeProviderKey": import.meta.env.VITE_GEOCODEPROVIDERKEY
        },
        "SearchExpression": "",
        "HasPatents": false,
        "HasSecurityCredentials": false,
        "SecurityCredentials": [
            ""
        ],
        "IsAuthor": false,
        "IsPublicSpeaker": false,
        "IsMilitary": false,
        "Educations": [{
            "SchoolName": "",
            "DegreeMajor": "",
            "DegreeName": "",
            "DegreeType": "",
            "MinimumGPA": 0
        }],
        "SchoolNames": [],
        "DegreeNames": [],
        "DegreeTypes": [],
        "Employers": [],
        "EmployersMustAllBeCurrentEmployer": false,
        "MonthsExperience": {
            "Minimum": null,
            "Maximum": null
        },
        "DocumentLanguages": [
            ""
        ],
        "Skills": [],
        "SkillsMustAllExist": false,
        "IsTopStudent": false,
        "IsCurrentStudent": false,
        "IsRecentGraduate": false,
        "JobTitles": [],
        "ExecutiveType": [
            ""
        ],
        "Certifications": [],
        "MonthsManagementExperience": {
            "Minimum": null,
            "Maximum": null
        },
        "CurrentManagementLevel": "",
        "LanguagesKnown": [],
        "LanguagesKnownMustAllExist": false,
        "Taxonomies": []
    },
    "ParsedDocument": ""
}

export default MASTER_JSON_COMMUNITY;