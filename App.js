import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList, Alert, Modal, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function App() {
    const [task, setTask] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const addTask = () => {
        if (task) {
            setTasks([...tasks, { id: Math.random().toString(), value: task, date }]);
            setTask('');
            setModalVisible(false);
            setShowDatePicker(false);
        } else {
            Alert.alert('Error', 'Please enter a task.');
        }
    };

    const removeTask = (taskId) => {
        const newTasks = tasks.filter(task => task.id !== taskId);
        setTasks(newTasks);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My ToDo List</Text>
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <Text style={styles.taskText}>
                            {item.value} (Due: {item.date.toLocaleDateString()})
                        </Text>
                        <Button title="Remove" onPress={() => removeTask(item.id)} color="red" />
                    </View>
                )}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setModalVisible(true)}
            >
                <Icon name="add" size={24} color="white" />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Add New Task</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Task Description"
                        value={task}
                        onChangeText={setTask}
                    />
                    <Button title="Pick a Date" onPress={() => setShowDatePicker(true)} />
                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                setDate(selectedDate || date);
                            }}
                        />
                    )}
                    <Button title="Add Task" onPress={addTask} color="#007BFF" />
                    <Button title="Cancel" onPress={() => setModalVisible(false)} color="gray" />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        marginTop: 40, // Adjusted margin to move title down
        marginBottom: 20,
        color: '#333',
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#007BFF',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        elevation: 3,
    },
    taskText: {
        flex: 1,
        marginRight: 10,
        fontSize: 16,
        color: '#333',
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#007BFF',
        borderRadius: 50,
        padding: 15,
        elevation: 5,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
});
