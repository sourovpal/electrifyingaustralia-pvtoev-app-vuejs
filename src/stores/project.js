import api from "../actions/api";
import { defineStore } from "pinia";

export const useProjectStore = defineStore('project', {

    state: () => ({
        toggleSendModal: false,
        toggleCustomerDetailsSidebar: false,
        units: [],
        rebateTypes: [],
        certificateTypes: [],
        project: null,
        recalculationLoading: false,
        inverterModels: [],
        panelModels: [],
        projectList: [],

        selfConsumption: 0,
        selectedPanelDetails: {
            id: null,
            quantity: 0
        },
        currentBills: 0,
        gstRate: 10,
        quotationDetails: {
            total: 0,
            gst: 0,
            totalAmountAfterStcDiscount: 0,
        }
    }),

    getters: {
        getDefaultRebateType(state) {
            if (!state.rebateTypes.length) return null;
            return state.rebateTypes[0].id;
        },
        getInverterSales(state) {
            if (!state.project) return [];
            return state.project.inverter_sales;
        },
        getProjectId(state) {
            if (!state.project) return null;
            return state.project.id
        },
        getTaxType(state) {
            if (!state.project) return null;
            return state.project.tax_type
        },
        getRecalculationLoadingState(state) {
            return state.recalculationLoading;
        },
        getAvailableInverters(state) {
            return state.inverterModels;
        },
        getAvailablePanels(state) {
            return state.panelModels;
        },
        getSelectedPanel: (state) =>
            state.panelModels.find(
                panel => panel.id.toString() === state.selectedPanelDetails?.panel_model_id?.toString()
            ),
        getSystemSize(state) {
            const panel = state.getSelectedPanel;
            if (!panel) return 0;

            const totalWatts = +panel.size * +state.selectedPanelDetails.quantity;
            return totalWatts ? totalWatts / 1000 : 0
        },
        getAnnualProduction(state) {
            // * Annual production (AC) = (System size * 4 (hours of sunlight in a day) * 365) - lower sunlight during the winter
            const hoursOfSunlightInADay = 4;
            const systemSize = state.getSystemSize;
            const lowerSunlightDuringTheWinter = 0; // this needs to be a non zero value

            const value = ((systemSize * hoursOfSunlightInADay) * 365) - lowerSunlightDuringTheWinter;
            return Number.isInteger(value) ? value : value.toFixed(2);
        },
        getAnnualBill(state) {
            // * Annual bills = (current bills->current bills * 4) + other costs
            return state.currentBills.total_amount * 4;
        },
        getSystemGrandTotal(state) {
            return 8500; // this should not be a hardcoded value
        },
        getUsedKWh: (state) => (state.selfConsumption / 100) * state.getAnnualProduction,
        getNetPresentValue(state) {
            // Take electricity price increase from term settings LATER
            // Take system efficiency from custom settings LATER
            // remove these comments when you do
            const tariffFeed = state.currentBills.tariff_feed_per_kwh;
            const targetYears = +state.getTermSettings?.term_in_years ?? 20;
            const annualProduction = state.getAnnualProduction;
            const electricityRate = state.currentBills.electricity_charge_per_kwh;
            const systemPrice = state.getSystemGrandTotal;

            const remainingKWh = annualProduction - state.getUsedKWh;
            const value = (
                targetYears * (
                    (remainingKWh * tariffFeed) +
                    ((annualProduction - remainingKWh) * electricityRate)
                )
            ) - systemPrice

            return value.toFixed(2);
        },
        getDiscountedPayback(state) {
            // Discounted payback = S / (UE + RT);
            const usedKWh = state.getUsedKWh;
            const systemPrice = state.getSystemGrandTotal;
            const electricityRate = state.currentBills.electricity_charge_per_kwh;
            const remainingKWh = state.getAnnualProduction - state.getUsedKWh;
            const tariffFeed = state.currentBills.tariff_feed_per_kwh;
            const discountedPayback = systemPrice / ((usedKWh * electricityRate) + (remainingKWh * tariffFeed));

            return discountedPayback.toFixed(2);
        },
        getReturnOfInvestment(state) {
            const ROI = state.getNetPresentValue / state.getSystemGrandTotal * 100;
            return ROI.toFixed(2);
        },
        getQuotationDetails: (state) => (key) => {
            return state.quotationDetails[key];
        },
        getPaymentSettings: (state) => {
            return state.project?.payment_settings ?? null;
        },
        getCustomSettings: (state) => {
            return state.project?.custom_settings ?? null;
        },
        getCurrentBills: (state) => {
            return state.project?.current_bills ?? null;
        },
        getTermSettings: (state) => {
            return state.project?.term_settings ?? null;
        },
        // currently only checks for the "No Certificates" certificate type
        // currently only checks for the "No Certificates" certificate type
        getStcEnabledState(state) {
            if (!state.getPaymentSettings) return false;
            if (!state.certificateTypes.length) return false;

            const stcCertificateTypeId = state.getPaymentSettings.certificate_type_id;
            const noCertificateRecord = state.certificateTypes.find(certificate => certificate.name.toLowerCase() === 'no certificates');

            if (!noCertificateRecord) return true;

            return stcCertificateTypeId.toString() !== noCertificateRecord.id.toString();
        },
        getStcCount: (state) => state.project ? Math.ceil(state.project.stc_score * state.getSystemSize) : 0,
        getCalculatedStcDiscount(state) {
	        if (!state.getPaymentSettings) return 0;
	        if (!state.getStcEnabledState) return 0;
	        if (!state.getPaymentSettings?.stc_price) return 0;

            return state.getStcCount * state.getPaymentSettings?.stc_price;
        },
        getPricings(state) {
            const pricings = state.project?.pricings; 
            if (!pricings?.length)
                return []

            return pricings;
        }
    },

    actions: {
        setSelfConsumption(payload) {
            this.selfConsumption = payload;
        },
        setQuotationDetails(payload) {
            this.quotationDetails = payload;
        },
        setToggleSendModal(payload = true) {
            this.toggleSendModal = payload;
        },
        setToggleCustomerDetailsSidebar(payload = true) {
            this.toggleCustomerDetailsSidebar = payload;
        },
        setRecalculationLoadingState(payload) {
            this.recalculationLoading = payload;
        },
        setSelectedPanel(incomingPanelDetails) {
            this.selectedPanelDetails = {
                ...this.selectedPanelDetails,
                ...incomingPanelDetails
            };
        },
        setCurrentBills(newCurrentBillsAmount) {
            this.currentBills = newCurrentBillsAmount;
        },
        async setCurrentProject(project_id) {
            const response = await api.get(`/projects/${project_id}`);
            this.project = response.data;

            this.setSelectedPanel({
                panel_model_id: response.data?.panel_sale?.panel_model_id,
                quantity: response.data?.panel_sale?.quantity,
            });

            // experimental
            this.setCurrentBills(response.data.current_bills);
        },
        async setProjectSelectables() {
            const response = await api.get('/projects/selectables');

            this.units = response.data.units;
            this.rebateTypes = response.data.rebate_types;
            this.certificateTypes = response.data.certificate_types;
            this.inverterModels = response.data.inverter_models;
            this.panelModels = response.data.panel_models;
        },
        async setProjectList() {
            const response = await api.get('projects/')
            this.projectList = response.data.data;
        },
    }

});

