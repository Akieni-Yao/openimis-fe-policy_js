import { formatServerError, formatGraphQLError } from '@openimis/fe-core';

export const reducer = (
    state = {
        fetchingPolicies: false,
        fetchedPolicies: false,
        errorPolicies: null,
        policies: null,
        fetchingInsureeEligibility: false,
        fetchedInsureeEligibility: false,
        errorInsureeEligibility: null,
        insureeEligibility: null,
        fetchingItemEligibility: false,
        fetchedInsureeItemEligibility: false,
        errorInsureeItemEligibility: null,
        insureeItemEligibility: null,
        fetchingInsureeItemEligibility: false,
        fetchedInsureeServiceEligibility: false,
        errorInsureeServiceEligibility: null,
        insureeInsureeServiceEligibility: null,
    },
    action) => {
    switch (action.type) {
        case 'POLICY_INSUREE_POLICIES_REQ':
            return {
                ...state,
                fetchingPolicies: true,
                fetchedPolicies: false,
                policies: null,
                errorPolicies: null,
            };
        case 'POLICY_INSUREE_POLICIES_RESP':
            return {
                ...state,
                fetchingPolicies: false,
                fetchedPolicies: true,
                policies: action.payload.data.policiesByInsuree.items,
                errorPolicies: formatGraphQLError(action.payload)
            };
        case 'POLICY_INSUREE_POLICIES_ERR':
            return {
                ...state,
                fetchingPolicies: false,
                errorPolicies: formatServerError(action.payload),
            };
        case 'POLICY_FAMILY_POLICIES_REQ':
            return {
                ...state,
                fetchingPolicies: true,
                fetchedPolicies: false,
                policies: null,
                errorPolicies: null,
            };
        case 'POLICY_FAMILY_POLICIES_RESP':
            return {
                ...state,
                fetchingPolicies: false,
                fetchedPolicies: true,
                policies: action.payload.data.policiesByFamily.items,
                errorPolicies: formatGraphQLError(action.payload)
            };
        case 'POLICY_FAMILY_POLICIES_ERR':
            return {
                ...state,
                fetchingPolicies: false,
                errorPolicies: formatServerError(action.payload),
            };
        case 'POLICY_INSUREE_ELIGIBILITY_REQ':
            return {
                ...state,
                fetchingInsureeEligibility: true,
                fetchedInsureeEligibility: false,
                insureeEligibility: null,
                errorInsureeEligibility: null,
            };
        case 'POLICY_INSUREE_ELIGIBILITY_RESP':
            return {
                ...state,
                fetchingInsureeEligibility: false,
                fetchedInsureeEligibility: true,
                insureeEligibility: action.payload.data.policyEligibilityByInsuree,
                errorInsureeEligibility: formatGraphQLError(action.payload),
            };
        case 'POLICY_INSUREE_ELIGIBILITY_ERR':
            return {
                ...state,
                fetchingInsureeEligibility: false,
                errorInsureeEligibility: formatServerError(action.payload),
            };
        case 'POLICY_INSUREE_ITEM_ELIGIBILITY_REQ':
            return {
                ...state,
                fetchingInsureeItemEligibility: true,
                fetchedInsureeItemEligibility: false,
                insureeItemEligibility: null,
                errorInsureeItemEligibility: null,
            };
        case 'POLICY_INSUREE_ITEM_ELIGIBILITY_RESP':
            return {
                ...state,
                fetchingInsureeItemEligibility: false,
                fetchedInsureeItemEligibility: true,
                insureeItemEligibility: action.payload.data.policyItemEligibilityByInsuree,
                errorInsureeItemEligibility: formatGraphQLError(action.payload),
            };
        case 'POLICY_INSUREE_ITEM_ELIGIBILITY_ERR':
            return {
                ...state,
                fetchingInsureeItemEligibility: false,
                errorInsureeItemEligibility: formatServerError(action.payload),
            };
        case 'POLICY_INSUREE_SERVICE_ELIGIBILITY_REQ':
            return {
                ...state,
                fetchingInsureeServiceEligibility: true,
                fetchedInsureeServiceEligibility: false,
                insureeServiceEligibility: null,
                errorInsureeServiceEligibility: null,
            };
        case 'POLICY_INSUREE_SERVICE_ELIGIBILITY_RESP':
            return {
                ...state,
                fetchingInsureeServiceEligibility: false,
                fetchedInsureeServiceEligibility: true,
                insureeServiceEligibility: action.payload.data.policyServiceEligibilityByInsuree,
                errorInsureeServiceEligibility: formatGraphQLError(action.payload),
            };
        case 'POLICY_INSUREE_SERVICE_ELIGIBILITY_ERR':
            return {
                ...state,
                fetchingInsureeServiceEligibility: false,
                errorInsureeServiceEligibility: formatServerError(action.payload),
            };
        default:
            return state;
    }
};
