import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * EmptyPlaceholder - 空内容占位提示
 * @param {string} icon - emoji 或字符图标（可选）
 * @param {string} title - 主标题
 * @param {string} message - 详细提示
 * @param {React.ReactNode} action - 可选的操作按钮/链接
 */
function EmptyPlaceholder({ icon = '📦', title = 'No items', message = '', action = null }) {
  return (
    <div className="empty-placeholder" role="status" aria-live="polite">
      <div className="empty-icon" aria-hidden="true">{icon}</div>
      <h3 className="empty-title">{title}</h3>
      {message && <p className="empty-message">{message}</p>}
      {action && <div className="empty-action">{action}</div>}
    </div>
  );
}

/**
 * EmptyCardPlaceholder - 卡片式空提示（用于 master-container）
 */
function EmptyCardPlaceholder(props) {
  return (
    <div className="empty-card-placeholder">
      <EmptyPlaceholder {...props} />
    </div>
  );
}

/**
 * EmptyTablePlaceholder - 表格式空提示（用于 table 行）
 */
function EmptyTablePlaceholder({ colSpan = 6, title = 'No items', message = '' }) {
  return (
    <tr>
      <td colSpan={colSpan} className="empty-table-cell">
        <EmptyPlaceholder icon="📭" title={title} message={message} />
      </td>
    </tr>
  );
}

export { EmptyPlaceholder, EmptyCardPlaceholder, EmptyTablePlaceholder };
export default EmptyPlaceholder;
