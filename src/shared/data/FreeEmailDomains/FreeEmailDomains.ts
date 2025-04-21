import { Yup } from "../../modules/Formik";
import ApiService from '../../api/noTokenApi';
import { trackPromise } from '../../modules/PromiseTrackter';

interface DomainResponse {
  exist: boolean;
  Error: boolean;
  Status: number;
}

export const checkDomainAvailability = async (domain: string) => {
    try {
        const response = await trackPromise(
            ApiService.postWithData('admin', 'domainAvailability', {
                domain: domain
            })
        );
        const data = response.data as DomainResponse;
        return !data.exist;
    } catch (error) {
        console.error('Error checking domain:', error);
        return false;
    }
};

export const userEmailValidation = Yup.string()
    .email('Enter a valid email')
    .required('Email is required')
    .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Enter Valid Email Format"
    )
    .test('domainValidation', 'Please enter Work Email', async (value) => {
        if (!value) return true;
        const domain = value.split('@')[1];
        if (!domain) return true;

        const isValidDomain = await checkDomainAvailability(domain);
        return isValidDomain;
    });