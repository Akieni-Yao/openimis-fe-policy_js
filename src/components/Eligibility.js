import React, { Component } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { withModulesManager, formatDateFromISO, FieldLabel, Table } from "@openimis/fe-core";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";

const styles = theme => ({
});

class Eligibility extends Component {
    render() {
        const { modulesManager, eligibility } = this.props;
        let itemFormatters = [];
        if (!modulesManager.hideField("policy", "insureeEligibility.minDate")) {
            itemFormatters.push(
                i => <FieldLabel module="policy" id="insureeEligibility.minDate" />,
                i => formatDateFromISO(this.props.modulesManager, this.props.intl, i.minDate),
            );
        }
        if (!modulesManager.hideField("policy", "insureeEligibility.left")) {
            itemFormatters.push(
                i => <FieldLabel module="policy" id="insureeEligibility.left" />,
                i => i.left
            );
        }
        if (!modulesManager.hideField("policy", "insureeEligibility.isOk")) {
            itemFormatters.push(i => i.isOk ? <ThumbUp /> : <ThumbDown />);
        }

        return (
            <Table
                items={[eligibility]}
                itemFormatters={itemFormatters}
            />
        )
    }
}

export default withModulesManager(withTheme(withStyles(styles)(Eligibility)));
