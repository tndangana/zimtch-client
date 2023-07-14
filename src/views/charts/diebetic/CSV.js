import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { ButtonBase, Tooltip } from '@mui/material';

// third-party
import { CSVLink } from 'react-csv';
import DownloadIcon from '@mui/icons-material/Download'; // assets
// ==============================|| CSV Export ||============================== //

export const CSVExport = ({ data, filename, headers }) => {
    const theme = useTheme();

    return (
        <Tooltip title="CSV Export" placement="left">
            <ButtonBase sx={{ mt: 0.5 }}>
                <CSVLink data={data} filename={filename} headers={headers}>
                    <DownloadIcon color={theme.palette.primary.main} aria-label="Export CSV File" />
                </CSVLink>
            </ButtonBase>
        </Tooltip>
    );
};
CSVExport.propTypes = {
    data: PropTypes.object,
    filename: PropTypes.string,
    headers: PropTypes.object
};
