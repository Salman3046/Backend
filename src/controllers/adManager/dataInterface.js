export class adManager {
    constructor() {}
    get(data) {
        var {
            user,
            adUserTransactions,
            adTargetLocations,
            budgetAndDurations,
            adTargetInterests,
            adTargetProfessions,
            adTargetGenders,
            adTargetAges,
            adPreferrences,
            adSubType,
            adType,
            adMastrerType,
            adMedias,
            adId,
            adStatus,
            discriptions,
            id
        } = data;
        var adPreferrence = [];
        var adTargetProfession = [];
        var adTargetInterest = [];
        adPreferrences.forEach(ele => {
            adPreferrence.push({
                id: ele.id,
                name: ele?.adPreferrencesMaster?.name
            })
        })
        adTargetProfessions.forEach(ele => {
            adTargetProfession.push({
                id: ele.id,
                name: ele?.adProfessionMaster?.name,
                priceForAudiance: ele?.adProfessionMaster?.priceForAudiance
            })
        })
        adTargetInterests.forEach(ele => {
            adTargetInterest.push({
                id: ele.id,
                name: ele?.adInterestsMaster?.interest?.name,
                priceForAudiance: ele?.adInterestsMaster?.priceForAudiance
            })
        })

        return {
            id,
            discriptions,
            adStatus,
            adId,
            adMedias,
            adMastrerType,
            adType,
            adSubType,
            adPreferrences: adPreferrence,
            adTargetProfessions: adTargetProfession,
            adTargetInterests: adTargetInterest,
            adTargetAges,
            adTargetGenders,
            adTargetLocations,
            budgetAndDurations,
            user,  
            totalAmountToBePaid: budgetAndDurations[0].totalAmountToBePaid,
            availableBalance:user.adUserTransactions[0].closingBalance
             
        }
    }
}