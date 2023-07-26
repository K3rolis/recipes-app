import React, { useContext } from 'react';
import styles from './CommentItem.module.css';

import Button from 'react-bootstrap/Button';
import { CommentProps } from '../../types/comments';
import { LoginContext } from '../Contexts/LoginContext';

type Comment = {
  handleEdit: (props: CommentProps) => void;
  handleDelete: (id: number) => void;
  props: CommentProps;
};

const CommentItem = ({ handleEdit, handleDelete, props }: Comment) => {
  const { auth } = useContext(LoginContext);
  return (
    <div className={styles.commentBox}>
      <div className={styles.commentHeader}>
        <div className={styles.metaData}>
          <div className={styles.name}>{props.user.username}</div>
          <div className={styles.date}>{props.postedDate}</div>
        </div>
        <div className={styles.buttons}>
          {props.userId === auth.id ? (
            <>
              <Button variant="outline-dark" onClick={() => handleEdit(props)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(props.id)}>
                Delete
              </Button>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className={styles.commentBody}>{props.description}</div>
    </div>
  );
};

export default CommentItem;
