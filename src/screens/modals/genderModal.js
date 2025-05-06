import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const GenderModal = ({ isVisible, onClose, onSelectGender }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Select Gender</Text>
        
        <TouchableOpacity style={styles.option} onPress={() => onSelectGender('Male')}>
          <Text style={styles.optionText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => onSelectGender('Female')}>
          <Text style={styles.optionText}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => onSelectGender('Other')}>
          <Text style={styles.optionText}>Other</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default GenderModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  option: {
    padding: 15,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
