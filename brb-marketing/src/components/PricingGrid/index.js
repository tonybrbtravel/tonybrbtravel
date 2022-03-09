/**
 *
 * PricingGrid
 *
 */

import React from 'react';
import styled from 'styled-components';
import Colors from '../../themes/Colors';

const Table = styled.table`
  width: 100%;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 60px;
  font-size: 14px;

  th {
    font-weight: bold;
    color: ${Colors.red};
    padding: 20px;
  }

  td {
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid ${Colors.shadow};
  }

  td:nth-child(1) {
    text-align: left;
  }

  tr:nth-child(even) {
    background-color: #f5f5f5;
  }
`;
function PricingGrid() {
  return (
    <Table>
      <thead>
        <tr>
          <th />
          <th>Go Solo</th>
          <th>Go Together</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Monthly Price</td>
          <td>£49.99</td>
          <td>£89.99</td>
        </tr>
        <tr>
          <td>New surprise trip unlock</td>
          <td>Every 4 months</td>
          <td>Every 4 months</td>
        </tr>
        <tr>
          <td>Return flights to your destination</td>
          <td>✓</td>
          <td>✓</td>
        </tr>
        <tr>
          <td>3.5+ TripAdvisor rated hotels</td>
          <td>✓</td>
          <td>✓</td>
        </tr>
        <tr>
          <td>Choose which dates you want to go away</td>
          <td>✓</td>
          <td>✓</td>
        </tr>
        <tr>
          <td>Sync trips with other subscribers</td>
          <td>✓</td>
          <td>✓</td>
        </tr>
        <tr>
          <td>Cancel / Pause anytime*</td>
          <td>✓</td>
          <td>✓</td>
        </tr>
        <tr>
          <td>A plus one included with every trip</td>
          <td>✕</td>
          <td>✓</td>
        </tr>
      </tbody>
    </Table>
  );
}

PricingGrid.propTypes = {};

export default PricingGrid;
