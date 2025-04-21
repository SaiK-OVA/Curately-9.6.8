
// const SmartyStreetsSDK = require("smartystreets-javascript-sdk");
import * as SmartyStreetsSDK from "smartystreets-javascript-sdk";
// const smart_key = import.meta.env.VITE_SMARTY_KEY;

const smartyStreetAddress = async (address: any) => {


    if (address) {
        const { full_address, city, optional_address, zip, state } = address;
        if (full_address && city && state) {
            let errorState = {
                isError: false,
                errorText: ""
            }
            const SmartyStreetsCore = SmartyStreetsSDK.core;
            const websiteKey = new SmartyStreetsCore.SharedCredentials("96941923756189618");
            const clientBuilder = new SmartyStreetsCore.ClientBuilder(websiteKey);
            const client = clientBuilder.buildUsStreetApiClient();
            let Lookup = SmartyStreetsSDK.usStreet.Lookup;
            let lookup = new Lookup();
            // console.log(address, 'address smart')


            lookup.street = full_address;
            lookup.city = city;
            lookup.state = state;
            lookup.zipCode = zip;
            lookup.street2 = optional_address;
            // lookup.country = 'USA';

            // lookup.license = "us-core-cloud";
            // lookup.geocode = true;
            lookup.match = "enhanced";

            var batch = new SmartyStreetsCore.Batch<any>();
            batch.add(lookup);

            if (lookup.street && lookup.city && lookup.state) {
                try {
                    let resp = await client.send(batch)
                    // console.log(resp.lookups[0].result[0], 'resp.lookups[0].result[0]')
                    if ((resp.lookups[0].result[0].analysis.dpvMatchCode !== "Y") && (resp.lookups[0].result[0].analysis.dpvFootnotes !== "AABB")) {
                        if (resp.lookups[0].result[0].analysis.dpvFootnotes.indexOf("AABB") === -1) {
                            errorState.isError = true;
                            errorState.errorText = "Please enter valid street address"
                        } else if (resp.lookups[0].result[0].analysis.dpvFootnotes.indexOf("CC") === -1) {
                            errorState.isError = true;
                            errorState.errorText = "The submitted secondary information (apartment, suite, etc.) was not recognized."
                        } else if (resp.lookups[0].result[0].analysis.dpvFootnotes.indexOf("AABB") !== -1) {
                            // console.log("is coming")
                            if (resp.lookups[0].result[0].analysis.footnotes && resp.lookups[0].result[0].analysis.footnotes.indexOf("V#") !== -1) {
                                errorState.isError = true;
                                errorState.errorText = "Please enter valid state or city";
                            }
                            else if (resp.lookups[0].result[0].analysis.footnotes && resp.lookups[0].result[0].analysis.footnotes.indexOf("A#") !== -1) {
                                errorState.isError = true;
                                errorState.errorText = "Please enter valid zip";
                            }
                        }
                    }
                }
                catch (e) {
                    errorState.isError = true;
                    errorState.errorText = "Failed to vaildate Address details";
                    console.log(e, 'errr');
                }


            }
            return errorState
        }
    }


}

export default smartyStreetAddress