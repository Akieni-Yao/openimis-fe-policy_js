import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from 'react-intl';
import { withTheme, withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { ProgressOrError, PublishedComponent, FormattedMessage, AmountInput, TextInput } from "@openimis/fe-core";
import { fetchInsureePolicies } from "../actions";

import { ACTIVE_POLICY_STATUS } from "../constants";

const styles = theme => ({
    item: theme.paper.item,
});

class InsureePolicyEligibilitySummary extends Component {

    state = {
        policies: []
    }

    componentDidMount() {
        if (this.props.insuree) {
            this.props.fetchInsureePolicies(this.props.insuree.chfId);
        } else {
            this.setState({ policies: [] })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!!prevProps.insuree && !this.props.insuree) {
            this.setState({ policies: [] })
            return;
        }
        if ((!prevProps.insuree && !!this.props.insuree) ||
            !!prevProps.insuree && !!this.props.insuree &&
            (
                prevProps.insuree.chfId == null
                || prevProps.insuree.chfId !== this.props.insuree.chfId
            )
        ) {
            this.setState(
                { policies: [] },
                e => {
                    this.props.fetchInsureePolicies(this.props.insuree.chfId)
                }
            )
            return;
        }
        if (!prevProps.fetchedPolicies && this.props.fetchedPolicies) {
            this.setState((state, props) => ({ policies: props.policies }))
        }
    }

    render() {
        const { classes, fetchingPolicies, fetchedPolicies, errorPolicies } = this.props;
        const { policies } = this.state;
        var activePolicies = !!policies && policies.filter(p => p.status === ACTIVE_POLICY_STATUS);
        return (
            <Fragment>
                <ProgressOrError progress={fetchingPolicies} error={errorPolicies} />
                {!!fetchedPolicies && !activePolicies.length &&
                    <Grid item className={classes.item}>
                        <FormattedMessage module="policy" id="policies.noActivePolicy" />
                    </Grid>
                }
                {!!fetchedPolicies && !!activePolicies.length && (
                    <Grid item>
                        <Grid container>
                            {activePolicies.map((activePolicy, i) => (
                                <Fragment key={`activePolicy-${i}`}>
                                    <Grid item xs={2} className={classes.item}>
                                        <TextInput
                                            value={activePolicy.productCode}
                                            module="policy"
                                            label="policy.policies.productCode"
                                            readOnly={true}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={classes.item}>
                                        <TextInput
                                            value={activePolicy.productName}
                                            module="policy"
                                            label="policy.policies.productName"
                                            readOnly={true}
                                        />
                                    </Grid>
                                    <Grid item xs={3} className={classes.item}>
                                        <PublishedComponent pubRef="core.DatePicker"
                                            value={activePolicy.expiryDate}
                                            module="policy"
                                            label="policies.expiryDate"
                                            readOnly={true}
                                        />
                                    </Grid>
                                    <Grid item xs={3} className={classes.item}>
                                        <AmountInput
                                            value={activePolicy.balance}
                                            module="claim"
                                            label="balance"
                                            readOnly={true}
                                            displayZero={true}
                                        />
                                    </Grid>
                                </Fragment>
                            ))}
                        </Grid>
                    </Grid>
                )}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    fetchingPolicies: state.policy.fetchingPolicies,
    fetchedPolicies: state.policy.fetchedPolicies,
    policies: state.policy.policies,
    errorPolicies: state.policy.errorPolicies,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchInsureePolicies }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(withTheme(
        withStyles(styles)(InsureePolicyEligibilitySummary)
    ))
);
