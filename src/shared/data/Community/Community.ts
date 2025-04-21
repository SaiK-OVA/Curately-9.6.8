const DEGREE_TYPES = [{
    text: "High School",
    value: "highSchoolOrEquivalent"
}, {
    text: "Some College",
    value: "someCollege"
}, {
    text: "Bachelors",
    value: "bachelors"
}, {
    text: "Masters",
    value: "masters"
}, {
    text: "Doctoral",
    value: "doctorate"
}];
const EXECUTIVE_TYPES = [{
    text: "None",
    value: "NONE"
}, {
    text: "Accounting",
    value: "ACCOUNTING"
}, {
    text: "Administrative",
    value: "ADMIN"
}, {
    text: "Business Development",
    value: "BUSINESS_DEV"
}, {
    text: "Executive",
    value: "EXECUTIVE"
}, {
    text: "Financial",
    value: "FINANCIAL"
}, {
    text: "General",
    value: "GENERAL"
}, {
    text: "Information Technology",
    value: "IT"
}, {
    text: "Learning",
    value: "LEARNING"
}, {
    text: "Marketing",
    value: "MARKETING"
}, {
    text: "Operations",
    value: "OPERATIONS"
}];
const LANGUAGES = [{
    id: "om",
    label: "(Afan) Oromo"
}, {
    id: "ab",
    label: "Abkhazian"
}, {
    id: "aa",
    label: "Afar"
}, {
    id: "af",
    label: "Afrikaans"
}, {
    id: "sq",
    label: "Albanian"
}, {
    id: "am",
    label: "Amharic"
}, {
    id: "ar",
    label: "Arabic"
}, {
    id: "hy",
    label: "Armenian"
}, {
    id: "as",
    label: "Assamese"
}, {
    id: "ay",
    label: "Aymara"
}, {
    id: "az",
    label: "Azerbaijani"
}, {
    id: "ba",
    label: "Bashkir"
}, {
    id: "eu",
    label: "Basque"
}, {
    id: "bn",
    label: "Bengali"
}, {
    id: "dz",
    label: "Bhutani"
}, {
    id: "bh",
    label: "Bihari"
}, {
    id: "bi",
    label: "Bislama"
}, {
    id: "br",
    label: "Breton"
}, {
    id: "bg",
    label: "Bulgarian"
}, {
    id: "my",
    label: "Burmese"
}, {
    id: "be",
    label: "Byelorussian"
}, {
    id: "km",
    label: "Cambodian"
}, {
    id: "ca",
    label: "Catalan"
}, {
    id: "zh",
    label: "Chinese"
}, {
    id: "co",
    label: "Corsican"
}, {
    id: "hr",
    label: "Croatian"
}, {
    id: "cs",
    label: "Czech"
}, {
    id: "da",
    label: "Danish"
}, {
    id: "nl",
    label: "Dutch"
}, {
    id: "en",
    label: "English"
}, {
    id: "eo",
    label: "Esperanto"
}, {
    id: "et",
    label: "Estonian"
}, {
    id: "fo",
    label: "Faeroese"
}, {
    id: "fj",
    label: "Fiji"
}, {
    id: "fi",
    label: "Finnish"
}, {
    id: "fr",
    label: "French"
}, {
    id: "fy",
    label: "Frisian"
}, {
    id: "gl",
    label: "Galician"
}, {
    id: "ka",
    label: "Georgian"
}, {
    id: "de",
    label: "German"
}, {
    id: "el",
    label: "Greek"
}, {
    id: "kl",
    label: "Greenlandic"
}, {
    id: "gn",
    label: "Guarani"
}, {
    id: "gu",
    label: "Gujarati"
}, {
    id: "ha",
    label: "Hausa"
}, {
    id: "he",
    label: "Hebrew (former iw)"
}, {
    id: "hi",
    label: "Hindi"
}, {
    id: "hu",
    label: "Hungarian"
}, {
    id: "is",
    label: "Icelandic"
}, {
    id: "id",
    label: "Indonesian (former in)"
}, {
    id: "ia",
    label: "Interlingua"
}, {
    id: "ie",
    label: "Interlingue"
}, {
    id: "ik",
    label: "Inupiak"
}, {
    id: "iu",
    label: "Inuktitut (Eskimo)"
}, {
    id: "ga",
    label: "Irish"
}, {
    id: "it",
    label: "Italian"
}, {
    id: "ja",
    label: "Japanese"
}, {
    id: "jw",
    label: "Javanese"
}, {
    id: "kn",
    label: "Kannada"
}, {
    id: "ks",
    label: "Kashmiri"
}, {
    id: "kk",
    label: "Kazakh"
}, {
    id: "rw",
    label: "Kinyarwanda"
}, {
    id: "ky",
    label: "Kirghiz"
}, {
    id: "rn",
    label: "Kirundi"
}, {
    id: "ko",
    label: "Korean"
}, {
    id: "ku",
    label: "Kurdish"
}, {
    id: "lo",
    label: "Laothian"
}, {
    id: "la",
    label: "Latin"
}, {
    id: "lv",
    label: "Latvian, Lettish"
}, {
    id: "ln",
    label: "Lingala"
}, {
    id: "lt",
    label: "Lithuanian"
}, {
    id: "mk",
    label: "Macedonian"
}, {
    id: "mg",
    label: "Malagasy"
}, {
    id: "ms",
    label: "Malay"
}, {
    id: "ml",
    label: "Malayalam"
}, {
    id: "mt",
    label: "Maltese"
}, {
    id: "mi",
    label: "Maori"
}, {
    id: "mr",
    label: "Marathi"
}, {
    id: "mo",
    label: "Moldavian"
}, {
    id: "mn",
    label: "Mongolian"
}, {
    id: "na",
    label: "Nauru"
}, {
    id: "ne",
    label: "Nepali"
}, {
    id: "no",
    label: "Norwegian"
}, {
    id: "oc",
    label: "Occitan"
}, {
    id: "or",
    label: "Oriya"
}, {
    id: "ps",
    label: "Pashto, Pushto"
}, {
    id: "fa",
    label: "Persian"
}, {
    id: "pl",
    label: "Polish"
}, {
    id: "pt",
    label: "Portuguese"
}, {
    id: "pa",
    label: "Punjabi"
}, {
    id: "qu",
    label: "Quechua"
}, {
    id: "rm",
    label: "Rhaeto-Romance"
}, {
    id: "ro",
    label: "Romanian"
}, {
    id: "ru",
    label: "Russian"
}, {
    id: "sm",
    label: "Samoan"
}, {
    id: "sg",
    label: "Sangro"
}, {
    id: "sa",
    label: "Sanskrit"
}, {
    id: "gd",
    label: "Scots Gaelic"
}, {
    id: "sr",
    label: "Serbian"
}, {
    id: "sh",
    label: "Serbo-Croatian"
}, {
    id: "st",
    label: "Sesotho"
}, {
    id: "tn",
    label: "Setswana"
}, {
    id: "sn",
    label: "Shona"
}, {
    id: "sd",
    label: "Sindhi"
}, {
    id: "si",
    label: "Singhalese"
}, {
    id: "ss",
    label: "Siswati"
}, {
    id: "sk",
    label: "Slovak"
}, {
    id: "sl",
    label: "Slovenian"
}, {
    id: "so",
    label: "Somali"
}, {
    id: "es",
    label: "Spanish"
}, {
    id: "su",
    label: "Sudanese"
}, {
    id: "sw",
    label: "Swahili"
}, {
    id: "sv",
    label: "Swedish"
}, {
    id: "tl",
    label: "Tagalog"
}, {
    id: "tg",
    label: "Tajik"
}, {
    id: "ta",
    label: "Tamil"
}, {
    id: "tt",
    label: "Tatar"
}, {
    id: "te",
    label: "Telugu"
}, {
    id: "th",
    label: "Thai"
}, {
    id: "bo",
    label: "Tibetan"
}, {
    id: "ti",
    label: "Tigrinya"
}, {
    id: "to",
    label: "Tonga"
}, {
    id: "ts",
    label: "Tsonga"
}, {
    id: "tr",
    label: "Turkish"
}, {
    id: "tk",
    label: "Turkmen"
}, {
    id: "tw",
    label: "Twi"
}, {
    id: "ug",
    label: "Uigur"
}, {
    id: "uk",
    label: "Ukrainian"
}, {
    id: "ur",
    label: "Urdu"
}, {
    id: "uz",
    label: "Uzbek"
}, {
    id: "vi",
    label: "Vietnamese"
}, {
    id: "vo",
    label: "Volapuk"
}, {
    id: "cy",
    label: "Welch"
}, {
    id: "wo",
    label: "Wolof"
}, {
    id: "xh",
    label: "Xhosa"
}, {
    id: "yi",
    label: "Yiddish (former ji)"
}, {
    id: "yo",
    label: "Yoruba"
}, {
    id: "za",
    label: "Zhuang"
}, {
    id: "zu",
    label: "Zulu"
}];
const PARSER_SUPPORTED_LANGUAGES = [{
    id: "bg",
    name: "Bulgarian"
}, {
    id: "zh",
    name: "Chinese"
}, {
    id: "hr",
    name: "Croatian"
}, {
    id: "cs",
    name: "Czech"
}, {
    id: "da",
    name: "Danish"
}, {
    id: "nl",
    name: "Dutch"
}, {
    id: "en",
    name: "English"
}, {
    id: "et",
    name: "Estonian"
}, {
    id: "fi",
    name: "Finnish"
}, {
    id: "fr",
    name: "French"
}, {
    id: "de",
    name: "German"
}, {
    id: "el",
    name: "Greek"
}, {
    id: "hu",
    name: "Hungarian"
}, {
    id: "it",
    name: "Italian"
}, {
    id: "ja",
    name: "Japanese"
}, {
    id: "lv",
    name: "Latvian, Lettish"
}, {
    id: "lt",
    name: "Lithuanian"
}, {
    id: "no",
    name: "Norwegian"
}, {
    id: "pl",
    name: "Polish"
}, {
    id: "pt",
    name: "Portuguese"
}, {
    id: "ro",
    name: "Romanian"
}, {
    id: "ru",
    name: "Russian"
}, {
    id: "sk",
    name: "Slovak"
}, {
    id: "sl",
    name: "Slovenian"
}, {
    id: "es",
    name: "Spanish"
}, {
    id: "sv",
    name: "Swedish"
}];
const TAXONOMIES = [{
    id: "0",
    name: "Common End-user Software",
    subtaxonomies: [{
        id: "108",
        name: "Core Office"
    }, {
        id: "228",
        name: "Data Centric"
    }, {
        id: "229",
        name: "Visual"
    }, {
        id: "230",
        name: "Planning and Analysis"
    }, {
        id: "231",
        name: "Contact Mgmt"
    }, {
        id: "232",
        name: "Other"
    }, {
        id: "299",
        name: "Operating Systems"
    }, {
        id: "300",
        name: "Mac"
    }]
}, {
    id: "1",
    name: "Administrative or Clerical",
    subtaxonomies: [{
        id: "109",
        name: "Stenography, Typing, Filing"
    }, {
        id: "110",
        name: "Billing and Collections"
    }, {
        id: "111",
        name: "Recordkeeping and Supplies"
    }, {
        id: "112",
        name: "Messages and Contact"
    }, {
        id: "113",
        name: "Admin"
    }, {
        id: "114",
        name: "Closing and Processing"
    }, {
        id: "115",
        name: "Computer Related"
    }, {
        id: "116",
        name: "Contracts"
    }, {
        id: "117",
        name: "Accounting Related"
    }, {
        id: "118",
        name: "Clerk"
    }, {
        id: "119",
        name: "Special Events"
    }, {
        id: "499",
        name: "Entry Level"
    }, {
        id: "945",
        name: "Machines"
    }]
}, {
    id: "4",
    name: "CAD/CAM",
    subtaxonomies: [{
        id: "356",
        name: "Architectural"
    }, {
        id: "357",
        name: "Engineering"
    }, {
        id: "358",
        name: "Other"
    }]
}, {
    id: "5",
    name: "Engineering",
    subtaxonomies: [{
        id: "132",
        name: "Chemical"
    }, {
        id: "133",
        name: "Civil"
    }, {
        id: "134",
        name: "Design"
    }, {
        id: "135",
        name: "Electrical"
    }, {
        id: "136",
        name: "Environmental"
    }, {
        id: "137",
        name: "Industrial"
    }, {
        id: "138",
        name: "Mechanical"
    }, {
        id: "139",
        name: "Network"
    }, {
        id: "140",
        name: "Nuclear"
    }, {
        id: "141",
        name: "Optical"
    }, {
        id: "142",
        name: "Plant"
    }, {
        id: "143",
        name: "Process"
    }, {
        id: "144",
        name: "Computer Hardware"
    }, {
        id: "145",
        name: "Structural"
    }, {
        id: "146",
        name: "Telecom"
    }, {
        id: "263",
        name: "Other"
    }, {
        id: "264",
        name: "Techniques"
    }, {
        id: "265",
        name: "Technologies"
    }, {
        id: "266",
        name: "Circuits"
    }, {
        id: "267",
        name: "Military"
    }, {
        id: "268",
        name: "RF"
    }, {
        id: "296",
        name: "Water, Wastewater, Soil, Hydrology"
    }, {
        id: "297",
        name: "Transportation"
    }, {
        id: "298",
        name: "Surveying"
    }, {
        id: "306",
        name: "Certifications"
    }, {
        id: "307",
        name: "General Engineering"
    }, {
        id: "308",
        name: "Power Engineering"
    }, {
        id: "309",
        name: "Stress Analysis and Testing"
    }, {
        id: "310",
        name: "Software and Tools"
    }, {
        id: "311",
        name: "Air and Aerospace"
    }, {
        id: "312",
        name: "Refrigeration"
    }]
}, {
    id: "6",
    name: "Environmental",
    subtaxonomies: [{
        id: "328",
        name: "Testing, Assessments, and Monitoring"
    }, {
        id: "329",
        name: "Air"
    }, {
        id: "330",
        name: "Water"
    }, {
        id: "331",
        name: "Soil"
    }, {
        id: "332",
        name: "Remediation, Mitigation, Cleanup, Removal"
    }, {
        id: "333",
        name: "General"
    }, {
        id: "334",
        name: "Hazmat"
    }, {
        id: "335",
        name: "Compliance, Licensing, Certifications"
    }, {
        id: "336",
        name: "Permitting"
    }, {
        id: "337",
        name: "Safety"
    }]
}, {
    id: "7",
    name: "Finance",
    subtaxonomies: [{
        id: "233",
        name: "Mortgage"
    }, {
        id: "234",
        name: "Lending"
    }, {
        id: "235",
        name: "Financial Planning & Analysis"
    }, {
        id: "236",
        name: "Securities"
    }, {
        id: "237",
        name: "Operations"
    }, {
        id: "238",
        name: "Equities"
    }, {
        id: "239",
        name: "Trading"
    }, {
        id: "240",
        name: "Credit and Underwriting"
    }, {
        id: "241",
        name: "Management"
    }, {
        id: "242",
        name: "Admin and Customer Service"
    }, {
        id: "243",
        name: "Other"
    }, {
        id: "244",
        name: "Broker"
    }, {
        id: "245",
        name: "Compliance"
    }, {
        id: "246",
        name: "Treasury"
    }, {
        id: "247",
        name: "Collections"
    }, {
        id: "702",
        name: "Tax"
    }, {
        id: "703",
        name: "Corporate Development"
    }, {
        id: "704",
        name: "Investor Relations"
    }, {
        id: "705",
        name: "Accounting"
    }, {
        id: "706",
        name: "Internal Audit"
    }, {
        id: "708",
        name: "Procurement"
    }, {
        id: "709",
        name: "Global Security"
    }, {
        id: "710",
        name: "Real Estate & Facilities"
    }, {
        id: "728",
        name: "Payroll"
    }, {
        id: "732",
        name: "Integration"
    }]
}, {
    id: "9",
    name: "Human Resources",
    subtaxonomies: [{
        id: "182",
        name: "Administration"
    }, {
        id: "183",
        name: "Benefits"
    }, {
        id: "184",
        name: "Compensation"
    }, {
        id: "185",
        name: "Payroll"
    }, {
        id: "187",
        name: "Employee Relations"
    }, {
        id: "188",
        name: "Management"
    }, {
        id: "190",
        name: "Recruitment & Staffing"
    }, {
        id: "258",
        name: "Compliance"
    }, {
        id: "259",
        name: "Software"
    }, {
        id: "262",
        name: "Other"
    }, {
        id: "580",
        name: "Learning & Development"
    }, {
        id: "581",
        name: "Organization Development"
    }, {
        id: "583",
        name: "Talent Sourcing"
    }, {
        id: "584",
        name: "Talent Management"
    }, {
        id: "574",
        name: "Diversity & Inclusion"
    }, {
        id: "575",
        name: "Global Mobility"
    }, {
        id: "577",
        name: "HR Analytics"
    }, {
        id: "578",
        name: "HR Operations"
    }, {
        id: "579",
        name: "HR Management"
    }, {
        id: "729",
        name: "Leadership Development"
    }]
}, {
    id: "10",
    name: "Information Technology",
    subtaxonomies: [{
        id: "191",
        name: "AS/400"
    }, {
        id: "192",
        name: "Data Mining"
    }, {
        id: "193",
        name: "Database"
    }, {
        id: "194",
        name: "Help Desk"
    }, {
        id: "195",
        name: "ERP and CRM"
    }, {
        id: "196",
        name: "Internet"
    }, {
        id: "197",
        name: "Mainframe"
    }, {
        id: "198",
        name: "Network"
    }, {
        id: "199",
        name: "Project Management"
    }, {
        id: "200",
        name: "QA and QC"
    }, {
        id: "201",
        name: "Architecture"
    }, {
        id: "202",
        name: "Training"
    }, {
        id: "203",
        name: "UNIX and LINUX"
    }, {
        id: "204",
        name: "Programming"
    }, {
        id: "251",
        name: "Config Deploy Upgrade Migrate"
    }, {
        id: "252",
        name: "Prebuilt Software"
    }, {
        id: "253",
        name: "Protocols and Standards"
    }, {
        id: "338",
        name: "Security"
    }, {
        id: "339",
        name: "Java"
    }, {
        id: "340",
        name: "Embedded and Realtime"
    }, {
        id: "341",
        name: "Reporting"
    }, {
        id: "342",
        name: "Workflow and Imaging"
    }, {
        id: "343",
        name: "Mail"
    }, {
        id: "344",
        name: "GIS"
    }, {
        id: "345",
        name: "Middleware and Integration"
    }, {
        id: "346",
        name: "Messaging"
    }, {
        id: "347",
        name: "Telephony"
    }, {
        id: "348",
        name: "Service Providers"
    }, {
        id: "349",
        name: "Operations, Monitoring and Software Management"
    }, {
        id: "350",
        name: "Financial"
    }, {
        id: "351",
        name: "Multimedia"
    }, {
        id: "352",
        name: "Content Management"
    }, {
        id: "353",
        name: "Medical"
    }, {
        id: "354",
        name: "SOX"
    }, {
        id: "355",
        name: "Search"
    }, {
        id: "550",
        name: "Cloud Computing"
    }, {
        id: "551",
        name: "Gaming"
    }, {
        id: "552",
        name: "Mobile Applications"
    }, {
        id: "553",
        name: "Big Data"
    }, {
        id: "554",
        name: "Business Intelligence"
    }, {
        id: "555",
        name: "Enterprise Storage"
    }, {
        id: "556",
        name: "Privacy and Data Security"
    }, {
        id: "718",
        name: "Distributed Systems"
    }, {
        id: "719",
        name: "Compiler & Runtime"
    }, {
        id: "720",
        name: "Machine Learning"
    }, {
        id: "731",
        name: "User Interface"
    }]
}, {
    id: "11",
    name: "General Non-Skilled Labor",
    subtaxonomies: [{
        id: "301",
        name: "Drivers"
    }, {
        id: "302",
        name: "Maintenance and Cleaning"
    }, {
        id: "303",
        name: "Construction Labor"
    }, {
        id: "304",
        name: "Non-Construction Labor"
    }, {
        id: "305",
        name: "Warehouse and Picking"
    }]
}, {
    id: "12",
    name: "Legal",
    subtaxonomies: [{
        id: "395",
        name: "Intellectual Property"
    }, {
        id: "396",
        name: "Contracts"
    }, {
        id: "397",
        name: "Clerical & Paralegal"
    }, {
        id: "398",
        name: "Admin"
    }, {
        id: "399",
        name: "Real Estate"
    }, {
        id: "400",
        name: "Litigation"
    }, {
        id: "403",
        name: "Corporate Finance"
    }, {
        id: "404",
        name: "Other"
    }, {
        id: "721",
        name: "Mergers & Acquisitions"
    }, {
        id: "723",
        name: "Employment"
    }, {
        id: "725",
        name: "Immigration"
    }, {
        id: "726",
        name: "Government Affairs"
    }, {
        id: "727",
        name: "Corporate"
    }]
}, {
    id: "13",
    name: "Manufacturing",
    subtaxonomies: [{
        id: "205",
        name: "Cleanroom"
    }, {
        id: "206",
        name: "Machining, Metalworking, Tool and Die"
    }, {
        id: "207",
        name: "Process Control"
    }, {
        id: "208",
        name: "Planning"
    }, {
        id: "209",
        name: "Logistics"
    }, {
        id: "210",
        name: "Management"
    }, {
        id: "362",
        name: "General"
    }, {
        id: "363",
        name: "Air and Aerospace"
    }, {
        id: "364",
        name: "Equipment"
    }, {
        id: "365",
        name: "Printing"
    }, {
        id: "405",
        name: "Software"
    }, {
        id: "479",
        name: "Chemical"
    }, {
        id: "480",
        name: "Composites"
    }]
}, {
    id: "14",
    name: "Marketing",
    subtaxonomies: [{
        id: "220",
        name: "Consumer"
    }, {
        id: "222",
        name: "Direct"
    }, {
        id: "223",
        name: "Market Research"
    }, {
        id: "224",
        name: "Public Relations"
    }, {
        id: "226",
        name: "Channel Management"
    }, {
        id: "227",
        name: "Brand Management"
    }, {
        id: "249",
        name: "General"
    }, {
        id: "250",
        name: "Events"
    }, {
        id: "585",
        name: "Product"
    }, {
        id: "586",
        name: "Technical Product Marketing"
    }, {
        id: "587",
        name: "Category Management"
    }, {
        id: "588",
        name: "Data & Analytics"
    }, {
        id: "589",
        name: "Business Planning"
    }, {
        id: "590",
        name: "Channel, Partner & Ecosystem Marketing"
    }, {
        id: "591",
        name: "Audience"
    }, {
        id: "592",
        name: "Marketing Communications"
    }, {
        id: "594",
        name: "Media"
    }, {
        id: "595",
        name: "Advertising"
    }, {
        id: "599",
        name: "Digital"
    }, {
        id: "700",
        name: "Production Studios"
    }]
}, {
    id: "15",
    name: "Scientific",
    subtaxonomies: [{
        id: "372",
        name: "Pharma"
    }, {
        id: "373",
        name: "Bio"
    }, {
        id: "374",
        name: "Animal"
    }, {
        id: "375",
        name: "Clinical"
    }, {
        id: "376",
        name: "Basic"
    }, {
        id: "377",
        name: "Chemical"
    }, {
        id: "378",
        name: "Imaging"
    }]
}, {
    id: "16",
    name: "Telecommunications",
    subtaxonomies: [{
        id: "313",
        name: "Wireless"
    }, {
        id: "314",
        name: "Cell Sites and Towers"
    }, {
        id: "315",
        name: "Cabling and Related"
    }, {
        id: "316",
        name: "Central Office"
    }, {
        id: "317",
        name: "Standards, Protocols, Technologies"
    }, {
        id: "318",
        name: "Network"
    }, {
        id: "319",
        name: "Hardware"
    }, {
        id: "320",
        name: "Software"
    }, {
        id: "321",
        name: "Power"
    }, {
        id: "322",
        name: "Labor"
    }, {
        id: "323",
        name: "Skilled"
    }]
}, {
    id: "19",
    name: "Insurance",
    subtaxonomies: [{
        id: "406",
        name: "Property and Casualty"
    }, {
        id: "407",
        name: "Life"
    }, {
        id: "408",
        name: "Claims and Adjusting"
    }, {
        id: "409",
        name: "Health"
    }, {
        id: "410",
        name: "Commercial"
    }, {
        id: "411",
        name: "Management"
    }, {
        id: "412",
        name: "Admin and Clerical"
    }, {
        id: "413",
        name: "Techniques"
    }, {
        id: "414",
        name: "Other"
    }, {
        id: "415",
        name: "Sales"
    }, {
        id: "416",
        name: "Auto"
    }]
}, {
    id: "20",
    name: "Sales",
    subtaxonomies: [{
        id: "100",
        name: "Inside Sales"
    }, {
        id: "101",
        name: "Outside Sales"
    }, {
        id: "102",
        name: "Direct Sales"
    }, {
        id: "103",
        name: "Channel Management"
    }, {
        id: "104",
        name: "Account Management"
    }, {
        id: "105",
        name: "General"
    }, {
        id: "106",
        name: "Management"
    }, {
        id: "107",
        name: "Presales"
    }, {
        id: "248",
        name: "Telemarketing"
    }, {
        id: "500",
        name: "Entry Level"
    }, {
        id: "930",
        name: "Retail"
    }]
}, {
    id: "21",
    name: "Aviation",
    subtaxonomies: []
}, {
    id: "22",
    name: "Construction Non-Laborer",
    subtaxonomies: [{
        id: "380",
        name: "Estimating"
    }, {
        id: "381",
        name: "Supervision"
    }, {
        id: "382",
        name: "Inspections"
    }, {
        id: "383",
        name: "Safety"
    }, {
        id: "384",
        name: "Commercial"
    }, {
        id: "385",
        name: "Residential"
    }, {
        id: "386",
        name: "Industrial"
    }, {
        id: "387",
        name: "Municipal"
    }, {
        id: "388",
        name: "Transportation"
    }, {
        id: "389",
        name: "General Tasks and Equipment"
    }, {
        id: "390",
        name: "Design"
    }, {
        id: "391",
        name: "Automation"
    }, {
        id: "392",
        name: "Compliance"
    }, {
        id: "393",
        name: "Civil"
    }, {
        id: "394",
        name: "Office, Admin and Clerical"
    }]
}, {
    id: "26",
    name: "Power Engineering",
    subtaxonomies: [{
        id: "23",
        name: "Nuclear Generation"
    }, {
        id: "24",
        name: "DOE Facilities"
    }, {
        id: "25",
        name: "Non-nuclear Generation"
    }, {
        id: "923",
        name: "Nuclear Misc"
    }, {
        id: "924",
        name: "Non-Nuclear Power Misc"
    }, {
        id: "925",
        name: "General Power Related"
    }]
}, {
    id: "27",
    name: "Light Technical/Trades/Skilled Labor",
    subtaxonomies: [{
        id: "283",
        name: "Union"
    }, {
        id: "284",
        name: "Welding Soldering Brazing Cutting"
    }, {
        id: "285",
        name: "Hvac and Refrig"
    }, {
        id: "286",
        name: "Carpentry and Painting"
    }, {
        id: "287",
        name: "Machine Shop"
    }, {
        id: "288",
        name: "Fine Assembly"
    }, {
        id: "289",
        name: "Printing"
    }, {
        id: "290",
        name: "Maint and Repair"
    }, {
        id: "291",
        name: "Electrical"
    }, {
        id: "292",
        name: "Moving Equipment"
    }, {
        id: "293",
        name: "Other"
    }, {
        id: "294",
        name: "Electronic"
    }, {
        id: "295",
        name: "Piping"
    }, {
        id: "379",
        name: "Assembly"
    }, {
        id: "426",
        name: "Other Construction Trades"
    }]
}, {
    id: "28",
    name: "Clinical",
    subtaxonomies: [{
        id: "269",
        name: "Claims and Billing"
    }, {
        id: "270",
        name: "Coding"
    }, {
        id: "271",
        name: "Analysis"
    }, {
        id: "272",
        name: "Admin"
    }, {
        id: "273",
        name: "Certifications"
    }, {
        id: "274",
        name: "Research"
    }, {
        id: "275",
        name: "Trials"
    }, {
        id: "276",
        name: "Tests and Functions"
    }, {
        id: "277",
        name: "Other"
    }, {
        id: "278",
        name: "Regulatory"
    }]
}, {
    id: "29",
    name: "Hardware Engineering",
    subtaxonomies: [{
        id: "713",
        name: "EMC / SI"
    }, {
        id: "714",
        name: "Test Engineering"
    }, {
        id: "715",
        name: "Design for X"
    }, {
        id: "716",
        name: "New Product Integration"
    }, {
        id: "717",
        name: "Reliability"
    }, {
        id: "730",
        name: "Firmware Engineering"
    }, {
        id: "733",
        name: "Mechanical Engineering"
    }, {
        id: "734",
        name: "Optical Engineering"
    }]
}, {
    id: "31",
    name: "Technical Writing",
    subtaxonomies: [{
        id: "427",
        name: "Software"
    }, {
        id: "428",
        name: "Training"
    }, {
        id: "429",
        name: "Specs and Documentation"
    }, {
        id: "430",
        name: "General"
    }, {
        id: "431",
        name: "Proposals and Related"
    }]
}, {
    id: "32",
    name: "Degreed Accounting",
    subtaxonomies: [{
        id: "254",
        name: "Software"
    }, {
        id: "255",
        name: "Tax"
    }, {
        id: "256",
        name: "Other"
    }, {
        id: "257",
        name: "Reconciliations"
    }, {
        id: "932",
        name: "Accounting"
    }, {
        id: "933",
        name: "Accounts Payable"
    }, {
        id: "940",
        name: "Accounts Receivable"
    }, {
        id: "942",
        name: "Auditing"
    }, {
        id: "944",
        name: "Bookkeeping"
    }, {
        id: "950",
        name: "CPA"
    }, {
        id: "951",
        name: "Consulting"
    }, {
        id: "952",
        name: "Cost Accounting"
    }, {
        id: "960",
        name: "Management"
    }, {
        id: "961",
        name: "Payroll"
    }, {
        id: "962",
        name: "Reporting"
    }]
}, {
    id: "33",
    name: "Graphic Design",
    subtaxonomies: [{
        id: "432",
        name: "Software"
    }, {
        id: "433",
        name: "Techniques and Activities"
    }, {
        id: "435",
        name: "Technical, Blueprints and Schematics"
    }]
}, {
    id: "34",
    name: "Business Operations and General Business",
    subtaxonomies: [{
        id: "436",
        name: "Management Activities or Functions"
    }, {
        id: "437",
        name: "General Skills and Activities"
    }]
}, {
    id: "36",
    name: "Travel",
    subtaxonomies: [{
        id: "487",
        name: "Travel Software"
    }, {
        id: "488",
        name: "Travel Related"
    }]
}, {
    id: "37",
    name: "Recruiting",
    subtaxonomies: [{
        id: "489",
        name: "Recruiting Software"
    }, {
        id: "490",
        name: "Recruiting Functions"
    }, {
        id: "492",
        name: "Recruiting Tasks and Activities"
    }, {
        id: "493",
        name: "Executive Recruiting"
    }, {
        id: "494",
        name: "IT Recruiting"
    }]
}, {
    id: "43",
    name: "Distribution and Shipping",
    subtaxonomies: []
}, {
    id: "44",
    name: "Petrochemical",
    subtaxonomies: [{
        id: "438",
        name: "Equipment"
    }, {
        id: "439",
        name: "Standards"
    }, {
        id: "440",
        name: "Activities"
    }, {
        id: "441",
        name: "Drilling"
    }, {
        id: "442",
        name: "Refining"
    }, {
        id: "443",
        name: "Software"
    }, {
        id: "444",
        name: "General"
    }]
}, {
    id: "45",
    name: "Transmission & Distribution",
    subtaxonomies: [{
        id: "324",
        name: "Overhead"
    }, {
        id: "325",
        name: "Substation"
    }, {
        id: "326",
        name: "Transmission"
    }, {
        id: "327",
        name: "Other"
    }]
}, {
    id: "46",
    name: "Call Center or Help Desk or Customer Service",
    subtaxonomies: [{
        id: "128",
        name: "Call Center"
    }, {
        id: "129",
        name: "Help Desk"
    }, {
        id: "130",
        name: "Customer Facing"
    }, {
        id: "131",
        name: "Management"
    }, {
        id: "279",
        name: "Other"
    }]
}, {
    id: "64",
    name: "Training",
    subtaxonomies: [{
        id: "359",
        name: "Computer-Based"
    }, {
        id: "360",
        name: "One On One"
    }, {
        id: "361",
        name: "Other"
    }]
}, {
    id: "66",
    name: "Facilities",
    subtaxonomies: []
}, {
    id: "67",
    name: "Business Development",
    subtaxonomies: []
}, {
    id: "68",
    name: "Entry Level",
    subtaxonomies: []
}, {
    id: "69",
    name: "QA and QC",
    subtaxonomies: [{
        id: "445",
        name: "Standards"
    }, {
        id: "446",
        name: "Techniques"
    }, {
        id: "447",
        name: "DT"
    }, {
        id: "448",
        name: "NDT"
    }, {
        id: "931",
        name: "Software"
    }, {
        id: "934",
        name: "Manufacturing"
    }, {
        id: "941",
        name: "Other"
    }]
}, {
    id: "70",
    name: "Research",
    subtaxonomies: [{
        id: "963",
        name: "Research and Development"
    }]
}, {
    id: "71",
    name: "Strategy and Planning",
    subtaxonomies: [{
        id: "501",
        name: "Modeling"
    }, {
        id: "502",
        name: "Planning and Estimating"
    }]
}, {
    id: "72",
    name: "Installation, Maintenance, Repair",
    subtaxonomies: [{
        id: "449",
        name: "IT Related"
    }, {
        id: "450",
        name: "Preventative"
    }, {
        id: "451",
        name: "General Installation"
    }, {
        id: "452",
        name: "General Repair"
    }]
}, {
    id: "73",
    name: "Grocery",
    subtaxonomies: []
}, {
    id: "74",
    name: "Biotech/Life Sciences",
    subtaxonomies: [{
        id: "600",
        name: "Agricultural Economics"
    }, {
        id: "601",
        name: "Allergies and Asthma"
    }, {
        id: "602",
        name: "Animal Anatomy"
    }, {
        id: "603",
        name: "Aquatic Biodiversity"
    }, {
        id: "604",
        name: "Avian External Anatomy"
    }, {
        id: "605",
        name: "Biochemistry"
    }, {
        id: "606",
        name: "Biodiversity"
    }, {
        id: "607",
        name: "General"
    }, {
        id: "608",
        name: "Food Agriculture"
    }, {
        id: "609",
        name: "Botany"
    }, {
        id: "610",
        name: "Cell Biology"
    }, {
        id: "612",
        name: "Ecology"
    }, {
        id: "613",
        name: "Evolution"
    }, {
        id: "614",
        name: "Fish Environmentalism"
    }, {
        id: "615",
        name: "Fish Terminology"
    }, {
        id: "616",
        name: "General Avian"
    }, {
        id: "617",
        name: "Genetics"
    }, {
        id: "618",
        name: "Geology"
    }, {
        id: "619",
        name: "Integrated Pest Management"
    }, {
        id: "620",
        name: "History Of Life"
    }, {
        id: "621",
        name: "Life Sciences"
    }, {
        id: "622",
        name: "Medical Equipment and Drug Manufacturers"
    }, {
        id: "623",
        name: "Medical Equipment, Implants, Devices, Drugs, Procedures"
    }, {
        id: "624",
        name: "Nanotechnology"
    }, {
        id: "625",
        name: "Oncology"
    }, {
        id: "626",
        name: "Paleontology"
    }, {
        id: "627",
        name: "Pesticides"
    }, {
        id: "628",
        name: "Pharmacogenomics and Toxicogenomics"
    }, {
        id: "629",
        name: "Phylogenetics"
    }, {
        id: "630",
        name: "Soil Science"
    }, {
        id: "631",
        name: "Tree Of Life"
    }, {
        id: "632",
        name: "Zoology"
    }]
}, {
    id: "75",
    name: "Pharmaceutical",
    subtaxonomies: [{
        id: "453",
        name: "Drug"
    }, {
        id: "454",
        name: "Non-Drug"
    }, {
        id: "611",
        name: "Drug Discovery"
    }]
}, {
    id: "76",
    name: "Broadcasting, Journalism",
    subtaxonomies: []
}, {
    id: "77",
    name: "Education",
    subtaxonomies: [{
        id: "503",
        name: "Recordkeeping"
    }, {
        id: "504",
        name: "Curricula"
    }, {
        id: "505",
        name: "Positions"
    }, {
        id: "506",
        name: "Activities and Tasks"
    }, {
        id: "507",
        name: "Programs and Projects"
    }]
}, {
    id: "78",
    name: "Retail",
    subtaxonomies: [{
        id: "211",
        name: "Planning"
    }, {
        id: "212",
        name: "Store Management"
    }, {
        id: "213",
        name: "Buyer"
    }, {
        id: "214",
        name: "Area Management"
    }, {
        id: "215",
        name: "General Management"
    }, {
        id: "216",
        name: "HR"
    }, {
        id: "217",
        name: "Safety and Loss Prevention"
    }, {
        id: "218",
        name: "Operations"
    }, {
        id: "219",
        name: "Sales"
    }, {
        id: "508",
        name: "POS Systems"
    }, {
        id: "509",
        name: "Money Handling"
    }, {
        id: "510",
        name: "Types"
    }, {
        id: "511",
        name: "Positions"
    }]
}, {
    id: "80",
    name: "General Management",
    subtaxonomies: [{
        id: "516",
        name: "Budget Related"
    }, {
        id: "517",
        name: "People Oriented"
    }, {
        id: "518",
        name: "Operations and Admin"
    }, {
        id: "519",
        name: "Management and Management Tasks"
    }]
}, {
    id: "81",
    name: "Banking and Related",
    subtaxonomies: [{
        id: "120",
        name: "Teller"
    }, {
        id: "121",
        name: "Credit"
    }, {
        id: "122",
        name: "Lending"
    }, {
        id: "123",
        name: "Loan Operations"
    }, {
        id: "124",
        name: "Check Operations"
    }, {
        id: "126",
        name: "Cash Mgmt"
    }, {
        id: "127",
        name: "Trading"
    }, {
        id: "280",
        name: "Retail"
    }, {
        id: "281",
        name: "Trust"
    }, {
        id: "282",
        name: "Other"
    }]
}, {
    id: "82",
    name: "Hotel and Hospitality",
    subtaxonomies: [{
        id: "172",
        name: "Banquet and Conventions"
    }, {
        id: "174",
        name: "Concierge"
    }, {
        id: "177",
        name: "Front Office"
    }, {
        id: "179",
        name: "Housekeeping"
    }, {
        id: "180",
        name: "Restaurant and Bar"
    }, {
        id: "512",
        name: "Cooking and Food"
    }, {
        id: "513",
        name: "Management"
    }, {
        id: "514",
        name: "Food Industry Classifications"
    }, {
        id: "515",
        name: "Safety Health and Sanitation"
    }]
}, {
    id: "85",
    name: "Architecture",
    subtaxonomies: [{
        id: "467",
        name: "Software"
    }, {
        id: "468",
        name: "Certs"
    }, {
        id: "469",
        name: "Urban Planning"
    }, {
        id: "470",
        name: "Commercial and Industrial"
    }, {
        id: "471",
        name: "Site"
    }, {
        id: "472",
        name: "Structure Subparts"
    }, {
        id: "473",
        name: "General"
    }, {
        id: "474",
        name: "Residential and Interior Design"
    }, {
        id: "475",
        name: "Civil"
    }, {
        id: "476",
        name: "Landscape"
    }, {
        id: "477",
        name: "Structural"
    }]
}, {
    id: "86",
    name: "Government",
    subtaxonomies: [{
        id: "522",
        name: "Security Clearances"
    }, {
        id: "523",
        name: "Procurement"
    }, {
        id: "524",
        name: "Regulatory"
    }]
}, {
    id: "87",
    name: "Warehouse",
    subtaxonomies: [{
        id: "495",
        name: "Warehouse Manual Labor"
    }, {
        id: "496",
        name: "Warehouse Related"
    }, {
        id: "497",
        name: "General Tasks"
    }, {
        id: "498",
        name: "Shipping"
    }]
}, {
    id: "89",
    name: "Bookkeeping, Office Management",
    subtaxonomies: [{
        id: "533",
        name: "Bookeeping Tasks"
    }, {
        id: "534",
        name: "Office Tasks"
    }, {
        id: "535",
        name: "Payroll Tasks"
    }, {
        id: "536",
        name: "Bookeeping Software"
    }]
}, {
    id: "90",
    name: "Personal Attributes",
    subtaxonomies: [{
        id: "528",
        name: "Attitude"
    }, {
        id: "529",
        name: "Languages"
    }, {
        id: "531",
        name: "Driver Licensing"
    }, {
        id: "532",
        name: "Aptitudes"
    }]
}, {
    id: "91",
    name: "Translations and Language Work",
    subtaxonomies: [{
        id: "901",
        name: "Translation"
    }, {
        id: "902",
        name: "Semantics"
    }]
}, {
    id: "92",
    name: "Knowledge and Learning Management",
    subtaxonomies: [{
        id: "903",
        name: "General Knowledge and Learning Management"
    }]
}, {
    id: "93",
    name: "User Experience",
    subtaxonomies: [{
        id: "558",
        name: "User Research"
    }, {
        id: "559",
        name: "Ergonomics"
    }, {
        id: "560",
        name: "UX Design"
    }, {
        id: "561",
        name: "Human Computer Interaction"
    }, {
        id: "562",
        name: "Interaction Design"
    }, {
        id: "563",
        name: "Usability Design"
    }, {
        id: "564",
        name: "Motion Design"
    }, {
        id: "565",
        name: "Visual Design"
    }, {
        id: "566",
        name: "Industrial Design"
    }, {
        id: "567",
        name: "Information Architect"
    }, {
        id: "568",
        name: "Integration Design"
    }, {
        id: "569",
        name: "Graphic Design"
    }, {
        id: "570",
        name: "Game Design"
    }, {
        id: "571",
        name: "Web Design"
    }, {
        id: "572",
        name: "Interactive Design"
    }, {
        id: "573",
        name: "Product Design"
    }]
}, {
    id: "94",
    name: "Physician and NonNursing/NonAdmin",
    subtaxonomies: []
}, {
    id: "95",
    name: "Healthcare Non-physician Non-nurse",
    subtaxonomies: [{
        id: "157",
        name: "Administration"
    }, {
        id: "158",
        name: "Allied Health"
    }, {
        id: "159",
        name: "Sanitation and Sterilization"
    }, {
        id: "160",
        name: "Ombudsman"
    }, {
        id: "161",
        name: "Environmental Services"
    }, {
        id: "162",
        name: "Facilities/Plant/Maintenance"
    }, {
        id: "163",
        name: "Food and Nutrition"
    }, {
        id: "164",
        name: "HR"
    }, {
        id: "165",
        name: "Operations"
    }, {
        id: "166",
        name: "Research"
    }, {
        id: "167",
        name: "Resource and Materials Management"
    }, {
        id: "168",
        name: "Safety and Security"
    }, {
        id: "169",
        name: "Social Work"
    }, {
        id: "170",
        name: "Marketing"
    }, {
        id: "171",
        name: "Support Services"
    }]
}, {
    id: "96",
    name: "Executive",
    subtaxonomies: [{
        id: "147",
        name: "CEO"
    }, {
        id: "148",
        name: "CFO"
    }, {
        id: "149",
        name: "CIO"
    }, {
        id: "150",
        name: "COO"
    }, {
        id: "151",
        name: "CTO"
    }, {
        id: "152",
        name: "Controller"
    }, {
        id: "153",
        name: "Director"
    }, {
        id: "154",
        name: "Managing Director"
    }, {
        id: "155",
        name: "President"
    }, {
        id: "156",
        name: "Other"
    }, {
        id: "964",
        name: "CXO"
    }, {
        id: "965",
        name: "CLO"
    }, {
        id: "966",
        name: "CCO"
    }, {
        id: "967",
        name: "CAO"
    }, {
        id: "968",
        name: "CSO"
    }, {
        id: "969",
        name: "CQO"
    }]
}, {
    id: "97",
    name: "Purchasing, Procurement, Inventory Control, Supply Chain",
    subtaxonomies: [{
        id: "458",
        name: "Purchasing"
    }, {
        id: "459",
        name: "Inventory"
    }, {
        id: "460",
        name: "Logistics"
    }, {
        id: "461",
        name: "Supply Chain"
    }]
}, {
    id: "98",
    name: "Security",
    subtaxonomies: [{
        id: "462",
        name: "Government Clearance"
    }, {
        id: "463",
        name: "IT"
    }, {
        id: "464",
        name: "Disaster"
    }, {
        id: "465",
        name: "Physical"
    }, {
        id: "466",
        name: "Financial, Accounting and Processes"
    }]
}, {
    id: "99",
    name: "Nursing",
    subtaxonomies: [{
        id: "366",
        name: "Phlebotomy"
    }, {
        id: "367",
        name: "Acute"
    }, {
        id: "368",
        name: "Pediatric"
    }, {
        id: "369",
        name: "Oncology"
    }, {
        id: "370",
        name: "Dental"
    }, {
        id: "371",
        name: "Radiology"
    }, {
        id: "417",
        name: "Admin"
    }, {
        id: "418",
        name: "CPR, EMT and First Aid"
    }, {
        id: "419",
        name: "Long Term"
    }, {
        id: "420",
        name: "Pain"
    }, {
        id: "421",
        name: "Billing and Coding"
    }, {
        id: "422",
        name: "Nurse Asst"
    }, {
        id: "423",
        name: "Educator"
    }, {
        id: "424",
        name: "Cardio"
    }, {
        id: "425",
        name: "Blood and Circulatory"
    }, {
        id: "455",
        name: "Other Asst"
    }, {
        id: "456",
        name: "Nursing Vocations and Certs"
    }, {
        id: "457",
        name: "Techniques"
    }]
}];


export { DEGREE_TYPES, EXECUTIVE_TYPES, LANGUAGES, PARSER_SUPPORTED_LANGUAGES, TAXONOMIES };
